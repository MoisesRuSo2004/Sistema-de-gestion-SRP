document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formEntrada");
  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");

  const csrfToken = document
    .querySelector('meta[name="_csrf"]')
    ?.getAttribute("content");
  const csrfHeader = document
    .querySelector('meta[name="_csrf_header"]')
    ?.getAttribute("content");

  const entradaId = localStorage.getItem("entradaIdEditar");
  if (!entradaId) {
    alert("No se encontró una entrada para editar.");
    return;
  }

  console.log("Editando entrada con ID:", entradaId);

  // Obtener entrada existente
  async function cargarEntrada(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/entradas/${id}`);
      if (!res.ok) throw new Error("Entrada no encontrada");

      const entrada = await res.json();
      console.log("Entrada cargada:", entrada);

      document.getElementById("fecha").value = entrada.fecha;
      document.getElementById("descripcion").value = entrada.descripcion;

      if (entrada.detalles && entrada.detalles.length > 0) {
        const detalle = entrada.detalles[0];
        inputNombre.value = detalle.nombre;
        inputNombre.readOnly = true;
        inputInsumoId.value = detalle.insumoId;
        document.getElementById("cantidad").value = detalle.cantidad;
        document.getElementById("proveedor").value = detalle.proveedor;
      }
    } catch (error) {
      console.error("Error al cargar la entrada:", error);
    }
  }

  cargarEntrada(entradaId);

  // Guardar cambios
  if (formulario) {
    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
      }

      const datosActualizados = {
        id: entradaId,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value,
        detalles: [
          {
            insumoId: inputInsumoId.value,
            nombre: inputNombre.value,
            cantidad: parseInt(document.getElementById("cantidad").value, 10),
            proveedor: document.getElementById("proveedor").value,
          },
        ],
      };

      console.log("Actualizando entrada con datos:", datosActualizados);

      const headers = {
        "Content-Type": "application/json",
      };

      if (csrfToken && csrfHeader) {
        headers[csrfHeader] = csrfToken;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/entradas/${entradaId}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(datosActualizados),
          }
        );

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error HTTP: ${res.status} - ${errorText}`);
        }

        const data = await res.json();
        console.log("Entrada actualizada con éxito:", data);
        mostrarAlerta();
      } catch (error) {
        console.error("Error al actualizar la entrada:", error);
        alert("Hubo un error al actualizar la entrada.");
      }
    });
  }

  function mostrarAlerta() {
    overlay.style.display = "block";
    alertaExito.classList.remove("d-none");
    alertaExito.style.display = "flex";

    setTimeout(ocultarAlerta, 5000);
  }

  function ocultarAlerta() {
    overlay.style.display = "none";
    alertaExito.classList.add("d-none");
    alertaExito.style.display = "none";
    window.location.href = "/entradas";
  }

  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  if (btnCerrarAlerta) btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  if (btnAceptarAlerta)
    btnAceptarAlerta.addEventListener("click", ocultarAlerta);
});

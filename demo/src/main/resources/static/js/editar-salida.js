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

  const salidaId = localStorage.getItem("SalidaIdEditar");
  console.log("Valor en localStorage -> SalidaIdEditar:", salidaId);
  if (!salidaId) {
    alert("No se encontró una entrada para editar.");
    return;
  }

  console.log("Editando entrada con ID:", salidaId);

  // Obtener entrada existente
  async function cargarSalida(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/salidas/${id}`);
      if (!res.ok) throw new Error("Salida no encontrada");

      const salida = await res.json();
      console.log("Entrada cargada:", salida);

      document.getElementById("fecha").value = salida.fecha;
      document.getElementById("descripcion").value = salida.descripcion;

      if (salida.detalles && salida.detalles.length > 0) {
        const detalle = salida.detalles[0];
        inputNombre.value = detalle.nombre;
        inputNombre.readOnly = true;
        inputInsumoId.value = detalle.insumoId;
        document.getElementById("cantidad").value = detalle.cantidad;
        //document.getElementById("proveedor").value = detalle.proveedor;
      }
    } catch (error) {
      console.error("Error al cargar la salida:", error);
    }
  }

  cargarSalida(salidaId);

  // Guardar cambios
  if (formulario) {
    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
      }

      const datosActualizados = {
        id: salidaId,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value,
        detalles: [
          {
            insumoId: inputInsumoId.value,
            nombre: inputNombre.value,
            cantidad: parseInt(document.getElementById("cantidad").value, 10),
          },
        ],
      };

      console.log("Actualizando salida con datos:", datosActualizados);

      const headers = {
        "Content-Type": "application/json",
      };

      if (csrfToken && csrfHeader) {
        headers[csrfHeader] = csrfToken;
      }

      try {
        const res = await fetch(
          `http://localhost:8080/api/salidas/${salidaId}`,
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
        console.log("Salida actualizada con éxito:", data);
        mostrarAlerta();
      } catch (error) {
        console.error("Error al actualizar la salida:", error);
        alert("Hubo un error al actualizar la salida.");
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
    window.location.href = "/salidas";
  }

  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  if (btnCerrarAlerta) btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  if (btnAceptarAlerta)
    btnAceptarAlerta.addEventListener("click", ocultarAlerta);
});

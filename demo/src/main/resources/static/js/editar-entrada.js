document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formEntrada");
  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const inputUnidadM = document.getElementById("unidadM");
  const inputCantidad = document.getElementById("cantidad");
  const inputProveedor = document.getElementById("proveedor");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const tablaInsumosBody = document.getElementById("tabla-insumos");

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

  let detallesEntrada = [];
  let indiceEditando = -1; // -1 significa que no estamos editando ningún insumo

  // Carga inicial de la entrada
  async function cargarEntrada(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/entradas/${id}`);
      if (!res.ok) throw new Error("Entrada no encontrada");

      const entrada = await res.json();
      console.log("Entrada cargada:", entrada);

      document.getElementById("fecha").value = entrada.fecha;
      document.getElementById("descripcion").value = entrada.descripcion;
      inputProveedor.value = entrada.proveedor || "";

      if (entrada.detalles && entrada.detalles.length > 0) {
        detallesEntrada = entrada.detalles;
        renderizarTablaInsumos();
      }
    } catch (error) {
      console.error("Error al cargar la entrada:", error);
    }
  }

  // Renderiza la tabla de insumos con botones Editar y Eliminar
  function renderizarTablaInsumos() {
    tablaInsumosBody.innerHTML = "";
    detallesEntrada.forEach((detalle, index) => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${detalle.nombre}</td>
        <td>${detalle.unidadM || ""}</td>
        <td>${detalle.cantidad}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm btn-editar" data-index="${index}" title="Editar">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-index="${index}" title="Eliminar">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;

      tablaInsumosBody.appendChild(fila);
    });

    // Eventos para botones eliminar
    tablaInsumosBody.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(
          e.target.closest("button").getAttribute("data-index"),
          10
        );
        detallesEntrada.splice(index, 1);
        renderizarTablaInsumos();
        resetFormulario();
      });
    });

    // Eventos para botones editar
    tablaInsumosBody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const index = parseInt(
          e.target.closest("button").getAttribute("data-index"),
          10
        );
        cargarInsumoAlFormulario(index);
      });
    });
  }

  // Carga insumo en formulario para editar
  function cargarInsumoAlFormulario(index) {
    const detalle = detallesEntrada[index];
    inputNombre.value = detalle.nombre;
    inputInsumoId.value = detalle.insumoId;
    inputUnidadM.value = detalle.unidadM || "";
    inputCantidad.value = detalle.cantidad;
    //inputProveedor.value = detalle.proveedor || "";

    indiceEditando = index;
    document.getElementById("btnAgregarInsumo").textContent = "Actualizar";
  }

  // Limpia el formulario y resetea estado de edición
  function resetFormulario() {
    inputNombre.value = "";
    inputInsumoId.value = "";
    inputUnidadM.value = "";
    inputCantidad.value = "";
    //inputProveedor.value = "";
    indiceEditando = -1;
    document.getElementById("btnAgregarInsumo").textContent = "Agregar";
  }

  // Botón para agregar o actualizar insumo en la lista local y refrescar tabla
  document.getElementById("btnAgregarInsumo").addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const insumoId = inputInsumoId.value;
    const cantidad = parseInt(inputCantidad.value, 10);
    const unidadM = inputUnidadM.value.trim();
    const proveedor = inputProveedor.value.trim();

    if (!nombre || !insumoId || isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingresa un insumo válido con cantidad mayor a cero.");
      return;
    }

    const nuevoDetalle = {
      insumoId,
      nombre,
      cantidad,
      unidadM,
      proveedor,
    };

    if (indiceEditando >= 0) {
      // Actualiza el insumo existente
      detallesEntrada[indiceEditando] = nuevoDetalle;
      indiceEditando = -1;
      document.getElementById("btnAgregarInsumo").textContent = "Agregar";
    } else {
      // Agrega nuevo insumo
      detallesEntrada.push(nuevoDetalle);
    }

    renderizarTablaInsumos();
    resetFormulario();
  });

  // Manejo del envío del formulario principal
  if (formulario) {
    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        return;
      }

      if (detallesEntrada.length === 0) {
        alert("Debe agregar al menos un insumo.");
        return;
      }

      const datosActualizados = {
        id: entradaId,
        fecha: document.getElementById("fecha").value,
        descripcion: document.getElementById("descripcion").value,
        proveedor: inputProveedor.value,
        detalles: detallesEntrada,
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
            headers,
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

  // Funciones para mostrar/ocultar alertas
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

  // Carga la entrada al inicio
  cargarEntrada(entradaId);
});

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formSalida");
  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const inputCantidad = document.getElementById("cantidad");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const tablaBody = document.getElementById("tabla-insumos");
  const listaSugerencias = document.getElementById("sugerencias");

  const csrfToken = document.querySelector('meta[name="_csrf"]')?.content;
  const csrfHeader = document.querySelector(
    'meta[name="_csrf_header"]'
  )?.content;

  const salidaId = localStorage.getItem("SalidaIdEditar");
  if (!salidaId) {
    alert("No se encontró una salida para editar.");
    return;
  }

  let detallesSalida = [];
  let indiceEditando = -1;

  // Inicialmente bloquear el campo cantidad
  inputCantidad.disabled = true;

  async function cargarSalida(id) {
    try {
      const res = await fetch(`http://localhost:8080/api/salidas/${id}`);
      if (!res.ok) throw new Error("Salida no encontrada");

      const salida = await res.json();
      document.getElementById("fecha").value = salida.fecha;
      document.getElementById("descripcion").value = salida.descripcion;

      if (salida.detalles && salida.detalles.length > 0) {
        detallesSalida = salida.detalles;
        renderizarTabla();
      }
    } catch (error) {
      console.error("Error al cargar la salida:", error);
    }
  }

  function renderizarTabla() {
    tablaBody.innerHTML = "";
    detallesSalida.forEach((detalle, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${detalle.nombre}</td>
        <td>${detalle.cantidad}</td>
        <td>
          <button type="button" class="btn btn-warning btn-sm btn-editar" data-index="${index}">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="btn btn-danger btn-sm btn-eliminar" data-index="${index}">
            <i class="fas fa-trash"></i>
          </button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });

    tablaBody.querySelectorAll(".btn-editar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        const detalle = detallesSalida[index];
        inputNombre.value = detalle.nombre;
        inputInsumoId.value = detalle.insumoId;
        inputCantidad.value = detalle.cantidad;
        inputCantidad.disabled = false;
        indiceEditando = index;
        document.getElementById("btnAgregarInsumo").textContent = "Actualizar";
      });
    });

    tablaBody.querySelectorAll(".btn-eliminar").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.getAttribute("data-index"));
        detallesSalida.splice(index, 1);
        renderizarTabla();
        resetFormulario();
      });
    });
  }

  function resetFormulario() {
    inputNombre.value = "";
    inputInsumoId.value = "";
    inputCantidad.value = "";
    inputCantidad.disabled = true;
    indiceEditando = -1;
    document.getElementById("btnAgregarInsumo").textContent = "Agregar";
  }

  inputNombre.addEventListener("input", async () => {
    const texto = inputNombre.value.trim();
    inputInsumoId.value = "";
    inputCantidad.disabled = true;

    if (texto.length < 2) {
      listaSugerencias.innerHTML = "";
      return;
    }

    try {
      const res = await fetch(
        `/api/insumos/buscar?nombre=${encodeURIComponent(texto)}`
      );
      const sugerencias = await res.json();
      listaSugerencias.innerHTML = "";

      if (sugerencias.length > 0) {
        sugerencias.forEach((insumo) => {
          const item = document.createElement("button");
          item.classList.add("list-group-item", "list-group-item-action");
          item.textContent = insumo.nombre;

          item.addEventListener("click", () => {
            inputNombre.value = insumo.nombre;
            inputInsumoId.value = insumo.id || insumo._id;
            inputCantidad.disabled = false;
            listaSugerencias.innerHTML = "";
          });

          listaSugerencias.appendChild(item);
        });
      } else {
        const noResult = document.createElement("div");
        noResult.classList.add("list-group-item");
        noResult.textContent = "Sin resultados";
        listaSugerencias.appendChild(noResult);
      }
    } catch (err) {
      console.error("Error al buscar insumos:", err);
    }
  });

  // Cerrar sugerencias al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#nombre") && !e.target.closest("#sugerencias")) {
      listaSugerencias.innerHTML = "";
    }
  });

  document.getElementById("btnAgregarInsumo").addEventListener("click", () => {
    const nombre = inputNombre.value.trim();
    const insumoId = inputInsumoId.value.trim();
    const cantidad = parseInt(inputCantidad.value, 10);

    if (!nombre || !insumoId || isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor completa todos los campos correctamente.");
      if (!insumoId) inputNombre.classList.add("is-invalid");
      if (isNaN(cantidad) || cantidad <= 0)
        inputCantidad.classList.add("is-invalid");
      return;
    }

    inputNombre.classList.remove("is-invalid");
    inputCantidad.classList.remove("is-invalid");

    const nuevoDetalle = { nombre, insumoId, cantidad };

    if (indiceEditando >= 0) {
      detallesSalida[indiceEditando] = nuevoDetalle;
    } else {
      const yaExiste = detallesSalida.some((d) => d.insumoId === insumoId);
      if (yaExiste) {
        alert("Este insumo ya fue agregado.");
        return;
      }
      detallesSalida.push(nuevoDetalle);
    }

    renderizarTabla();
    resetFormulario();
  });

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    if (detallesSalida.length === 0) {
      alert("Debe agregar al menos un insumo.");
      return;
    }

    const datosActualizados = {
      id: salidaId,
      fecha: document.getElementById("fecha").value,
      descripcion: document.getElementById("descripcion").value,
      detalles: detallesSalida,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    if (csrfToken && csrfHeader) headers[csrfHeader] = csrfToken;

    try {
      const res = await fetch(`http://localhost:8080/api/salidas/${salidaId}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(datosActualizados),
      });

      if (!res.ok) throw new Error(await res.text());

      mostrarAlerta();
    } catch (error) {
      console.error("Error al actualizar la salida:", error);
      alert("Hubo un error al actualizar la salida.");
    }
  });

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

  cargarSalida(salidaId);
});

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formSalida");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const inputCantidad = document.getElementById("cantidad");
  const inputCantidadA = document.getElementById("cantidadA");
  const listaSugerencias = document.getElementById("sugerencias");
  const tablaInsumos = document.getElementById("tabla-insumos");

  const insumosAgregados = [];

  const csrfToken = document.querySelector('meta[name="_csrf"]')?.content;
  const csrfHeader = document.querySelector(
    'meta[name="_csrf_header"]'
  )?.content;

  // Establecer fecha actual
  const fechaInput = document.getElementById("fecha");
  if (fechaInput) {
    fechaInput.value = new Date().toISOString().split("T")[0];
  }

  // 🔍 Autocompletado con fetch
  inputNombre.addEventListener("input", async () => {
    const texto = inputNombre.value.trim();

    if (texto.length < 2) {
      listaSugerencias.innerHTML = "";
      return;
    }

    try {
      const respuesta = await fetch(
        `/api/insumos/buscar?nombre=${encodeURIComponent(texto)}`
      );
      const sugerencias = await respuesta.json();

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
            inputCantidadA.value = insumo.stock;
            listaSugerencias.innerHTML = "";
          });

          listaSugerencias.appendChild(item);
        });
      } else {
        const item = document.createElement("div");
        item.classList.add("list-group-item");
        item.textContent = "Sin resultados";
        listaSugerencias.appendChild(item);
      }
    } catch (err) {
      console.error("Error al obtener sugerencias:", err);
    }
  });

  // Cerrar sugerencias al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#nombre") && !e.target.closest("#sugerencias")) {
      listaSugerencias.innerHTML = "";
    }
  });

  // ➕ Agregar insumo a la tabla
  document.getElementById("btnAgregarInsumo").addEventListener("click", () => {
    const id = inputInsumoId.value;
    const nombre = inputNombre.value.trim();
    const cantidad = parseInt(inputCantidad.value, 10);

    if (!id || !nombre || isNaN(cantidad) || cantidad <= 0) {
      alert("Selecciona un insumo válido y una cantidad positiva.");
      return;
    }

    // Verificar si el insumo ya fue agregado
    const yaExiste = insumosAgregados.some((i) => i.insumoId === id);
    if (yaExiste) {
      alert("Este insumo ya ha sido agregado.");
      return;
    }

    // Agregar insumo a la lista
    insumosAgregados.push({ insumoId: id, nombre, cantidad });

    const fila = document.createElement("tr");
    fila.innerHTML = `
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td><button class="btn btn-sm btn-danger btnEliminar">Eliminar</button></td>
  `;
    tablaInsumos.appendChild(fila);

    fila.querySelector(".btnEliminar").addEventListener("click", () => {
      tablaInsumos.removeChild(fila);
      const index = insumosAgregados.findIndex((i) => i.insumoId === id);
      if (index !== -1) insumosAgregados.splice(index, 1);
    });

    inputNombre.value = "";
    inputInsumoId.value = "";
    inputCantidad.value = "";
    inputCantidadA.value = "";
    inputCantidad.disabled = true;
  });

  // 📤 Enviar salida al backend
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    formulario.classList.add("was-validated");

    if (!formulario.checkValidity()) return;

    if (insumosAgregados.length === 0) {
      alert("Debes agregar al menos un insumo.");
      return;
    }

    // Construir datos sin proveedor
    const datosSalida = {
      fecha: fechaInput.value,
      descripcion: document.getElementById("descripcion").value,
      detalles: insumosAgregados,
    };

    try {
      const headers = { "Content-Type": "application/json" };
      if (csrfToken && csrfHeader) headers[csrfHeader] = csrfToken;

      const res = await fetch("http://localhost:8080/api/salidas", {
        method: "POST",
        headers,
        body: JSON.stringify(datosSalida),
      });

      if (!res.ok) {
        let errorMsg = "No se pudo guardar la salida.";
        try {
          const errorData = await res.json();
          errorMsg = errorData.message || errorMsg;
        } catch (_) {
          errorMsg = await res.text(); // fallback si no es JSON
        }
        throw new Error(errorMsg);
      }

      mostrarAlerta();
      formulario.reset();
      tablaInsumos.innerHTML = "";
      insumosAgregados.length = 0;
    } catch (err) {
      console.error("Error al guardar salida:", err);
      alert(err.message);
    }
  });

  // 🧹 Botón Limpiar
  document.getElementById("btnLimpiar").addEventListener("click", () => {
    formulario.reset();
    formulario.classList.remove("was-validated");
    inputInsumoId.value = "";
    listaSugerencias.innerHTML = "";
    inputCantidad.disabled = true;
    tablaInsumos.innerHTML = "";
    insumosAgregados.length = 0;
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
    window.location.href = "/inventario";
  }

  btnCerrarAlerta?.addEventListener("click", ocultarAlerta);
  btnAceptarAlerta?.addEventListener("click", ocultarAlerta);
});

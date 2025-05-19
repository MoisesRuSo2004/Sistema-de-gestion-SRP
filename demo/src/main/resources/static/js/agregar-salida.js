document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");
  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const listaSugerencias = document.getElementById("sugerencias");
  const alertaError = document.getElementById("alertaError");
  const btnCerrarError = alertaError.querySelector(".dismiss");
  const btnAceptarError = alertaError.querySelector(".track");
  const mensajeError = document.getElementById("mensajeError");

  // CSRF
  const csrfToken = document
    .querySelector('meta[name="_csrf"]')
    .getAttribute("content");
  const csrfHeader = document
    .querySelector('meta[name="_csrf_header"]')
    .getAttribute("content");

  // Debug para ver si estamos cargando correctamente
  console.log("Script de agregar-entrada cargado correctamente");
  console.log("CSRF Token:", csrfToken);

  const params = new URLSearchParams(window.location.search);
  const idURL = params.get("id");
  const nombreURL = params.get("nombre")
    ? decodeURIComponent(params.get("nombre"))
    : "";

  console.log("Parámetros URL:", { idURL, nombreURL });

  if (idURL && nombreURL) {
    inputInsumoId.value = idURL;
    inputNombre.value = nombreURL;
    inputNombre.readOnly = true;
    console.log("Formulario prellenado con:", { id: idURL, nombre: nombreURL });
  }

  // Prellenar fecha con la de hoy
  const fechaInput = document.getElementById("fecha");
  if (fechaInput) {
    const hoy = new Date().toISOString().split("T")[0];
    fechaInput.value = hoy;
    console.log("Fecha establecida:", hoy);
  }

  // Limpiar sugerencias si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#nombre")) {
      listaSugerencias.innerHTML = "";
    }
  });

  // Crear entrada
  async function crearSalida(datosSalida) {
    try {
      const respuesta = await fetch("http://localhost:8080/api/salidas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [csrfHeader]: csrfToken,
        },
        body: JSON.stringify(datosSalida),
      });

      if (!respuesta.ok) {
        const data = await respuesta.json(); // ✅ PARSEAMOS COMO JSON
        const mensajeError = data?.message || "Error al procesar la salida.";
        throw new Error(mensajeError);
      }

      return await respuesta.json();
    } catch (error) {
      console.error("Error al crear la salida:", error);
      mostrarAlertaError(error.message); // solo mensaje limpio
      return null;
    }
  }

  // Submit
  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    const datosSalida = {
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

    const resultado = await crearSalida(datosSalida);

    if (resultado) {
      formulario.reset();
      formulario.classList.remove("was-validated");
      inputInsumoId.value = "";
      mostrarAlerta();
    }
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    formulario.reset();
    formulario.classList.remove("was-validated");
    inputInsumoId.value = "";
    listaSugerencias.innerHTML = "";
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

    if (ocultarAlerta) {
      window.location.href = "/inventario";
    }
  }

  btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  btnAceptarAlerta.addEventListener("click", ocultarAlerta);

  function mostrarAlertaError(mensaje) {
    mensajeError.textContent = mensaje;
    overlay.style.display = "block";
    alertaError.classList.remove("d-none");
    alertaError.style.display = "flex";

    setTimeout(ocultarAlertaError, 8000);
  }

  function ocultarAlertaError() {
    overlay.style.display = "none";
    alertaError.classList.add("d-none");
    alertaError.style.display = "none";
  }

  btnCerrarError.addEventListener("click", ocultarAlertaError);
  btnAceptarError.addEventListener("click", ocultarAlertaError);
});

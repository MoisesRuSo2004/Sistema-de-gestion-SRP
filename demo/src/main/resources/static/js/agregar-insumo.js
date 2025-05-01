document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  // Extraer CSRF token y header desde las etiquetas meta
  const csrfToken = document
    .querySelector('meta[name="_csrf"]')
    .getAttribute("content");
  const csrfHeader = document
    .querySelector('meta[name="_csrf_header"]')
    .getAttribute("content");

  async function crearInsumo(datosInsumo) {
    try {
      const respuesta = await fetch("http://localhost:8080/api/insumos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [csrfHeader]: csrfToken, // Usamos el header dinámico
        },
        body: JSON.stringify(datosInsumo),
      });

      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      return await respuesta.json();
    } catch (error) {
      console.error("Error al crear el insumo:", error);
      return null;
    }
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    const datosInsumo = {
      nombre: document.getElementById("nombre").value,
      stock: parseInt(document.getElementById("cantidad").value, 10),
      unidadM: document.getElementById("unidadM").value,
    };

    const resultado = await crearInsumo(datosInsumo);

    if (resultado) {
      formulario.reset();
      formulario.classList.remove("was-validated");
      mostrarAlerta();
    } else {
      alert("Hubo un problema al guardar el insumo.");
    }
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    formulario.reset();
    formulario.classList.remove("was-validated");
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
});

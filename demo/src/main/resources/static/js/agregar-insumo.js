document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  async function crearInsumo(datosInsumo) {
    try {
      const respuesta = await fetch("http://localhost:8080/api/insumos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    overlay.style.display = "block"; // Mostrar fondo oscuro
    alertaExito.classList.remove("d-none"); // Asegurar que se muestra
    alertaExito.style.display = "flex"; // Asegurar visibilidad

    // Ocultar la alerta después de 5 segundos automáticamente
    setTimeout(ocultarAlerta, 5000);
  }

  function ocultarAlerta() {
    overlay.style.display = "none"; // Ocultar fondo oscuro
    alertaExito.classList.add("d-none"); // Ocultar alerta
    alertaExito.style.display = "none"; // Asegurar que se oculta correctamente
  }

  // Cerrar alerta al hacer clic en el botón de cerrar o "Ok"
  btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  btnAceptarAlerta.addEventListener("click", ocultarAlerta);
});

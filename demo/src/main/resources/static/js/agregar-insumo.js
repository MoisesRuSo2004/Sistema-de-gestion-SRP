document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");
  const campoCantidad = document.getElementById("cantidad");

  // Crear banner para alerta stock bajo (puedes crear el div en HTML o dinámicamente aquí)
  let alertaStockBajo = document.getElementById("alertaStockBajo");
  if (!alertaStockBajo) {
    alertaStockBajo = document.createElement("div");
    alertaStockBajo.id = "alertaStockBajo";
    alertaStockBajo.style.background = "#f8d7da"; // rojo claro
    alertaStockBajo.style.color = "#842029";
    alertaStockBajo.style.padding = "10px";
    alertaStockBajo.style.margin = "10px 0";
    alertaStockBajo.style.border = "1px solid #f5c2c7";
    alertaStockBajo.style.borderRadius = "4px";
    alertaStockBajo.style.display = "none";
    alertaStockBajo.textContent =
      "¡Atención! El stock ingresado es igual o inferior a 20.";
    formulario.prepend(alertaStockBajo);
  }

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
          [csrfHeader]: csrfToken,
        },
        body: JSON.stringify(datosInsumo),
      });

      if (!respuesta.ok) {
        if (respuesta.status === 409) {
          // Error por nombre duplicado
          const msg = await respuesta.text();
          alert(`Error: ${msg}`);
          return null;
        } else {
          throw new Error(`Error HTTP: ${respuesta.status}`);
        }
      }

      return await respuesta.json();
    } catch (error) {
      console.error("Error al crear el insumo:", error);
      alert("Hubo un problema al guardar el insumo.");
      return null;
    }
  }

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    alertaStockBajo.style.display = "none";
    campoCantidad.classList.remove("border-danger"); // Quitar borde rojo previo

    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    const stockIngresado = parseInt(campoCantidad.value, 10);
    const datosInsumo = {
      nombre: document.getElementById("nombre").value,
      stock: stockIngresado,
      unidadM: document.getElementById("unidadM").value,
    };

    // Si stock ≤ 20, mostrar alerta visual y borde rojo en campo
    if (stockIngresado <= 20) {
      alertaStockBajo.style.display = "block";
      campoCantidad.classList.add("border-danger");
    }

    const resultado = await crearInsumo(datosInsumo);

    if (resultado) {
      formulario.reset();
      formulario.classList.remove("was-validated");
      alertaStockBajo.style.display = "none";
      campoCantidad.classList.remove("border-danger");
      mostrarAlerta();
    }
  });

  document.getElementById("btnLimpiar").addEventListener("click", () => {
    formulario.reset();
    formulario.classList.remove("was-validated");
    alertaStockBajo.style.display = "none";
    campoCantidad.classList.remove("border-danger");
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

  btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  btnAceptarAlerta.addEventListener("click", ocultarAlerta);
});

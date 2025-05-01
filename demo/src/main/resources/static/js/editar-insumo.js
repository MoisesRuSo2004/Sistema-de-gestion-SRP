document.addEventListener("DOMContentLoaded", async () => {
  const insumoId = new URLSearchParams(window.location.search).get("id");
  if (insumoId) await cargarDatosInsumo(insumoId);
});

async function cargarDatosInsumo(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/insumos/${id}`);
    if (!response.ok)
      throw new Error(`Error al obtener el insumo: ${response.status}`);

    const insumo = await response.json();

    document.getElementById("nombre").value = insumo.nombre || "";
    document.getElementById("cantidad").value = insumo.stock || 0;
    document.getElementById("unidadM").value = insumo.unidadM || "";
  } catch (error) {
    console.error("Error al cargar el insumo:", error);
    mostrarAlerta(
      "Error",
      "Hubo un error al cargar los datos del insumo.",
      false
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");

  formulario.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.classList.add("was-validated");
      return;
    }

    const insumoId = new URLSearchParams(window.location.search).get("id");
    if (!insumoId) {
      mostrarAlerta("Error", "No se encontró el ID del insumo.", false);
      return;
    }

    const datosInsumo = {
      id: insumoId,
      nombre: document.getElementById("nombre").value,
      stock: parseFloat(document.getElementById("cantidad").value) || 0,
      unidadM: document.getElementById("unidadM").value,
    };

    const resultado = await actualizarInsumo(insumoId, datosInsumo);

    if (resultado) {
      formulario.classList.remove("was-validated");
      mostrarAlerta(
        "¡Insumo actualizado!",
        "El insumo se ha actualizado correctamente.",
        true
      );
    } else {
      mostrarAlerta(
        "Error",
        "Hubo un problema al actualizar el insumo.",
        false
      );
    }
  });

  async function actualizarInsumo(id, datosInsumo) {
    try {
      // Obtener token CSRF y header desde las metas del HTML
      const token = document
        .querySelector('meta[name="_csrf"]')
        .getAttribute("content");
      const header = document
        .querySelector('meta[name="_csrf_header"]')
        .getAttribute("content");

      const response = await fetch(`http://localhost:8080/api/insumos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          [header]: token, // Aquí se pasa el token CSRF con el nombre correcto
        },
        body: JSON.stringify(datosInsumo),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error HTTP: ${response.status}, Detalle: ${errorText}`);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Error al actualizar el insumo:", error);
      return null;
    }
  }

  function mostrarAlerta(titulo, mensaje, esExito) {
    const tituloElemento = alertaExito.querySelector(".title");
    const mensajeElemento = alertaExito.querySelector(".message");

    tituloElemento.textContent = titulo;
    mensajeElemento.textContent = mensaje;

    overlay.style.display = "block"; // Mostrar fondo oscuro
    alertaExito.classList.remove("d-none");
    alertaExito.style.display = "flex";

    setTimeout(() => {
      ocultarAlerta(esExito);
    }, 5000);
  }

  function ocultarAlerta(esExito) {
    overlay.style.display = "none";
    alertaExito.classList.add("d-none");
    alertaExito.style.display = "none";

    if (esExito) {
      window.location.href = "/inventario";
    }
  }

  btnCerrarAlerta.addEventListener("click", () => ocultarAlerta(false));
  btnAceptarAlerta.addEventListener("click", () => ocultarAlerta(true));
});

document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("insumoForm");
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const btnCerrarAlerta = document.querySelector("#alertaExito .dismiss");
  const btnAceptarAlerta = document.querySelector("#alertaExito .track");
  const inputNombre = document.getElementById("nombre");
  const inputInsumoId = document.getElementById("insumoIdSeleccionado");
  const listaSugerencias = document.getElementById("sugerencias");

  // CSRF
  const csrfToken = document
    .querySelector('meta[name="_csrf"]')
    .getAttribute("content");
  const csrfHeader = document
    .querySelector('meta[name="_csrf_header"]')
    .getAttribute("content");

  // Buscar insumos por texto
  inputNombre.addEventListener("input", async function () {
    const texto = this.value.trim();
    listaSugerencias.innerHTML = "";

    if (texto.length < 2) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/insumos?buscar=${texto}`
      );
      const insumos = await response.json();

      insumos.forEach((insumo) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "list-group-item list-group-item-action";
        btn.textContent = insumo.nombre;

        btn.addEventListener("click", () => {
          inputNombre.value = insumo.nombre;
          inputInsumoId.value = insumo.id;
          listaSugerencias.innerHTML = "";
        });

        listaSugerencias.appendChild(btn);
      });
    } catch (error) {
      console.error("Error al buscar insumos:", error);
    }
  });

  // Limpiar sugerencias si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#nombre")) {
      listaSugerencias.innerHTML = "";
    }
  });

  // Crear entrada
  async function crearEntrada(datosEntrada) {
    try {
      const respuesta = await fetch("http://localhost:8080/api/entradas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          [csrfHeader]: csrfToken,
        },
        body: JSON.stringify(datosEntrada),
      });

      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

      return await respuesta.json();
    } catch (error) {
      console.error("Error al crear la entrada:", error);
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

    const datosEntrada = {
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

    const resultado = await crearEntrada(datosEntrada);

    if (resultado) {
      formulario.reset();
      formulario.classList.remove("was-validated");
      inputInsumoId.value = "";
      mostrarAlerta();
    } else {
      alert("Hubo un problema al guardar la Entrada.");
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
      window.location.href = "/entradas";
    }
  }

  btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  btnAceptarAlerta.addEventListener("click", ocultarAlerta);
});

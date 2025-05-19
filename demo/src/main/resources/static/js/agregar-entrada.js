document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("formEntrada");
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
    ?.getAttribute("content");
  const csrfHeader = document
    .querySelector('meta[name="_csrf_header"]')
    ?.getAttribute("content");

  // Debug para ver si estamos cargando correctamente
  console.log("Script de agregar-entrada cargado correctamente");
  console.log("CSRF Token:", csrfToken);

  // Buscar insumos por texto
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
  async function crearEntrada(datosEntrada) {
    try {
      console.log("Intentando crear entrada con datos:", datosEntrada);

      const headers = {
        "Content-Type": "application/json",
      };

      // Añadir token CSRF si está disponible
      if (csrfToken && csrfHeader) {
        headers[csrfHeader] = csrfToken;
      }

      const respuesta = await fetch("http://localhost:8080/api/entradas", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(datosEntrada),
      });

      console.log("Respuesta del servidor:", respuesta.status);

      if (!respuesta.ok) {
        const errorText = await respuesta.text();
        console.error("Error del servidor:", errorText);
        throw new Error(`Error HTTP: ${respuesta.status} - ${errorText}`);
      }

      const data = await respuesta.json();
      console.log("Entrada creada exitosamente:", data);
      return data;
    } catch (error) {
      console.error("Error al crear la entrada:", error);
      return null;
    }
  }

  // Submit
  if (formulario) {
    console.log("Formulario encontrado correctamente: formEntrada");
    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      console.log("Formulario enviado");

      if (!formulario.checkValidity()) {
        console.log("Formulario no válido");
        formulario.classList.add("was-validated");
        return;
      }

      console.log("Formulario válido, preparando datos");

      // Verificar que tenemos el ID del insumo
      if (!inputInsumoId.value) {
        alert("Debe seleccionar un insumo válido");
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
            proveedor: document.getElementById("proveedor").value,
          },
        ],
      };

      console.log("Enviando datos:", datosEntrada);

      const resultado = await crearEntrada(datosEntrada);

      if (resultado) {
        console.log("Entrada creada exitosamente");
        formulario.reset();
        formulario.classList.remove("was-validated");
        inputInsumoId.value = "";
        mostrarAlerta();
      } else {
        console.error("Error al guardar la entrada");
        alert(
          "Hubo un problema al guardar la Entrada. Revisa la consola para más detalles."
        );
      }
    });
  } else {
    console.error("No se encontró el formulario con ID 'formEntrada'");
  }

  // Botón Limpiar
  const btnLimpiar = document.getElementById("btnLimpiar");
  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", () => {
      formulario.reset();
      formulario.classList.remove("was-validated");
      inputInsumoId.value = "";
      listaSugerencias.innerHTML = "";
      console.log("Formulario limpiado");
    });
  }

  function mostrarAlerta() {
    console.log("Mostrando alerta de éxito");
    overlay.style.display = "block";
    alertaExito.classList.remove("d-none");
    alertaExito.style.display = "flex";

    setTimeout(ocultarAlerta, 5000);
  }

  function ocultarAlerta() {
    console.log("Ocultando alerta");
    overlay.style.display = "none";
    alertaExito.classList.add("d-none");
    alertaExito.style.display = "none";

    console.log("Redirigiendo a /entradas");
    window.location.href = "/inventario";
  }

  if (btnCerrarAlerta) {
    btnCerrarAlerta.addEventListener("click", ocultarAlerta);
  }

  if (btnAceptarAlerta) {
    btnAceptarAlerta.addEventListener("click", ocultarAlerta);
  }
});

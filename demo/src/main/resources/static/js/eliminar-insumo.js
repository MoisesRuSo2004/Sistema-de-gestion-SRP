document.addEventListener("DOMContentLoaded", () => {
  const btnEliminar = document.getElementById("btnEliminar");
  const insumoId = new URLSearchParams(window.location.search).get("id");

  if (!insumoId) return;

  btnEliminar.addEventListener("click", () => {
    mostrarConfirmacion(
      "¿Eliminar insumo?",
      "Esta acción no se puede deshacer. ¿Estás seguro?",
      () => eliminarInsumo(insumoId)
    );
  });
});

async function eliminarInsumo(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/insumos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    mostrarAlerta(
      "¡Eliminado!",
      "El insumo ha sido eliminado correctamente.",
      true
    );
  } catch (error) {
    console.error("Error al eliminar el insumo:", error);
    mostrarAlerta("Error", "Hubo un problema al eliminar el insumo.", false);
  }
}

function mostrarConfirmacion(titulo, mensaje, callback) {
  const alertaConfirmacion = document.getElementById("alertaConfirmacion");
  const overlay = document.getElementById("overlay");
  const tituloElemento = alertaConfirmacion.querySelector(".title");
  const mensajeElemento = alertaConfirmacion.querySelector(".message");
  const btnAceptar = alertaConfirmacion.querySelector(".track");
  const btnCancelar = alertaConfirmacion.querySelector(".dismiss");

  tituloElemento.textContent = titulo;
  mensajeElemento.textContent = mensaje;

  overlay.style.display = "block";
  alertaConfirmacion.classList.remove("d-none");
  alertaConfirmacion.style.display = "flex";

  btnAceptar.onclick = () => {
    ocultarConfirmacion();
    callback();
  };

  btnCancelar.onclick = ocultarConfirmacion;
}

function ocultarConfirmacion() {
  const alertaConfirmacion = document.getElementById("alertaConfirmacion");
  const overlay = document.getElementById("overlay");

  overlay.style.display = "none";
  alertaConfirmacion.classList.add("d-none");
  alertaConfirmacion.style.display = "none";
}

function mostrarAlerta(titulo, mensaje, esExito) {
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");
  const tituloElemento = alertaExito.querySelector(".title");
  const mensajeElemento = alertaExito.querySelector(".message");
  const btnAceptar = alertaExito.querySelector(".track");

  tituloElemento.textContent = titulo;
  mensajeElemento.textContent = mensaje;

  overlay.style.display = "block";
  alertaExito.classList.remove("d-none");
  alertaExito.style.display = "flex";

  setTimeout(() => {
    ocultarAlerta(esExito);
  }, 4000);

  btnAceptar.onclick = () => ocultarAlerta(esExito);
}

function ocultarAlerta(esExito) {
  const alertaExito = document.getElementById("alertaExito");
  const overlay = document.getElementById("overlay");

  overlay.style.display = "none";
  alertaExito.classList.add("d-none");
  alertaExito.style.display = "none";

  if (esExito) {
    window.location.href = "/inventario";
  }
}

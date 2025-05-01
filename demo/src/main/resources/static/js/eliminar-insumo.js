document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const alertaConfirmacion = document.getElementById("alertaConfirmacion");

  const btnCerrarConfirmacion = alertaConfirmacion.querySelectorAll(".dismiss");
  const btnConfirmarEliminacion = alertaConfirmacion.querySelector(".track");

  let insumoIdSeleccionado = null;
  let botonSeleccionado = null;

  // Escuchar clicks en botones de eliminación
  document.addEventListener("click", async (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if (!boton) return;

    e.preventDefault();
    insumoIdSeleccionado = boton.getAttribute("data-id");
    botonSeleccionado = boton;

    if (insumoIdSeleccionado) mostrarConfirmacion();
  });

  // Confirmar eliminación
  btnConfirmarEliminacion.addEventListener("click", async () => {
    ocultarConfirmacion();

    const eliminado = await eliminarInsumo(insumoIdSeleccionado);

    if (eliminado && botonSeleccionado) {
      const fila = botonSeleccionado.closest("tr");
      if (fila) fila.remove();
    }

    insumoIdSeleccionado = null;
    botonSeleccionado = null;
  });

  // Cancelar confirmación
  btnCerrarConfirmacion.forEach((btn) => {
    btn.addEventListener("click", ocultarConfirmacion);
  });

  async function eliminarInsumo(id) {
    try {
      const token = document
        .querySelector('meta[name="_csrf"]')
        ?.getAttribute("content");
      const header = document
        .querySelector('meta[name="_csrf_header"]')
        ?.getAttribute("content");

      const headers = token && header ? { [header]: token } : {};

      const response = await fetch(`http://localhost:8080/api/insumos/${id}`, {
        method: "DELETE",
        headers: headers,
      });

      if (!response.ok) {
        console.error(
          "Error al eliminar:",
          response.status,
          await response.text()
        );
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error de red al eliminar insumo:", error);
      return false;
    }
  }

  function mostrarConfirmacion() {
    overlay.style.display = "block";
    alertaConfirmacion.classList.remove("d-none");
  }

  function ocultarConfirmacion() {
    overlay.style.display = "none";
    alertaConfirmacion.classList.add("d-none");
  }
});

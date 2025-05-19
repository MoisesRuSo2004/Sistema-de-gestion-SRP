document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const alertaConfirmacion = document.getElementById("alertaConfirmacion");

  const btnCerrarConfirmacion = alertaConfirmacion.querySelectorAll(".dismiss");
  const btnConfirmarEliminacion = alertaConfirmacion.querySelector(".track");

  let entradaIdSeleccionada = null;
  let botonSeleccionado = null;

  // Escuchar clicks en botones de eliminación
  document.addEventListener("click", async (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if (!boton) return;

    e.preventDefault();
    entradaIdSeleccionada = boton.getAttribute("data-id");
    botonSeleccionado = boton;

    if (entradaIdSeleccionada) mostrarConfirmacion();
  });

  // Confirmar eliminación
  btnConfirmarEliminacion.addEventListener("click", async () => {
    ocultarConfirmacion();

    const eliminado = await eliminarEntrada(entradaIdSeleccionada);

    if (eliminado && botonSeleccionado) {
      // Eliminar todas las filas relacionadas a esa entrada
      const idEntrada = entradaIdSeleccionada;
      document.querySelectorAll("tr").forEach((fila) => {
        const boton = fila.querySelector(".btn-eliminar");
        if (boton && boton.getAttribute("data-id") === idEntrada) {
          fila.remove();
        }
      });
    }

    entradaIdSeleccionada = null;
    botonSeleccionado = null;
  });

  // Cancelar confirmación
  btnCerrarConfirmacion.forEach((btn) => {
    btn.addEventListener("click", ocultarConfirmacion);
  });

  // ✅ Función renombrada para mayor claridad
  async function eliminarEntrada(id) {
    try {
      const token = document
        .querySelector('meta[name="_csrf"]')
        ?.getAttribute("content");
      const header = document
        .querySelector('meta[name="_csrf_header"]')
        ?.getAttribute("content");

      const headers = token && header ? { [header]: token } : {};

      const response = await fetch(`http://localhost:8080/api/entradas/${id}`, {
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
      console.error("Error de red al eliminar entrada:", error);
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

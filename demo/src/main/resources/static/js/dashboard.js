document.addEventListener("DOMContentLoaded", function () {
  fetch("/api/dashboard/resumen")
    .then((response) => response.json())
    .then((data) => {
      // Actualizar tarjetas
      document.getElementById("totalInsumos").textContent = data.totalInsumos;
      document.getElementById("totalEntradas").textContent = data.totalEntradas;
      document.getElementById("totalSalidas").textContent = data.totalSalidas;
      document.getElementById("insumosCero").textContent =
        data.insumosBajoStock;
    })
    .catch((error) => console.error("Error al cargar el dashboard:", error));
});

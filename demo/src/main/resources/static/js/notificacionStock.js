let notificaciones = [];
let notificacionesMostradas = 0;
const LIMITE_POR_CARGA = 5;

function renderizarNotificaciones() {
  const contenedor = document.getElementById("alertas-stock");

  // Solo añadimos nuevas, no borramos las anteriores
  const fin = Math.min(
    notificacionesMostradas + LIMITE_POR_CARGA,
    notificaciones.length
  );

  console.log(`Mostrando de ${notificacionesMostradas} a ${fin}`);

  for (let i = notificacionesMostradas; i < fin; i++) {
    const insumo = notificaciones[i];
    const alerta = document.createElement("a");
    alerta.className = "dropdown-item d-flex align-items-center";
    alerta.innerHTML = `
        <div class="mr-3">
          <div class="icon-circle bg-warning">
            <i class="fas fa-exclamation-triangle text-white"></i>
          </div>
        </div>
        <div>
          <div class="small text-gray-500">${new Date().toLocaleDateString()}</div>
          Stock crítico: <strong>${insumo.nombre}</strong> (${insumo.stock} ${
      insumo.unidadM
    })
        </div>
      `;
    contenedor.appendChild(alerta);
  }

  notificacionesMostradas = fin;

  // Mostrar u ocultar botón "Ver más"
  const botonVerMas = document.getElementById("ver-mas");
  if (notificacionesMostradas >= notificaciones.length) {
    botonVerMas.style.display = "none";
  } else {
    botonVerMas.style.display = "block";
  }
}

function cargarNotificacionesStockBajo() {
  fetch("http://localhost:8080/api/insumos/stock-bajo")
    .then((response) => response.json())
    .then((data) => {
      notificaciones = data;
      notificacionesMostradas = 0;

      console.log("Notificaciones cargadas:", notificaciones.length);

      const badge = document.getElementById("badge-counter");
      const contenedor = document.getElementById("alertas-stock");

      if (data.length === 0) {
        contenedor.innerHTML =
          '<div class="dropdown-item text-muted">Sin alertas de stock</div>';
        badge.textContent = "0";
        badge.classList.remove("badge-danger");

        document.getElementById("ver-mas").style.display = "none";
        return;
      }

      badge.textContent = data.length;
      badge.classList.add("badge-danger");

      contenedor.innerHTML = ""; // Limpiar antes de renderizar
      renderizarNotificaciones();
    })
    .catch((error) => {
      console.error("Error al obtener alertas de stock:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarNotificacionesStockBajo();

  const botonVerMas = document.getElementById("ver-mas");
  botonVerMas.addEventListener("click", function (e) {
    e.preventDefault();
    renderizarNotificaciones();
  });
});

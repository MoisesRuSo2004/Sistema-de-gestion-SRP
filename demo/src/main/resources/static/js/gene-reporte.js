document.addEventListener("DOMContentLoaded", function () {
  const filtros = JSON.parse(sessionStorage.getItem("filtros"));
  const datos = JSON.parse(sessionStorage.getItem("datosReporte"));

  // Validar que existan datos
  if (!filtros || !datos) {
    alert("⚠️ No hay datos para mostrar el reporte.");
    window.location.href = "/"; // Redirige si no hay datos
    return;
  }

  // Mostrar filtros
  document.getElementById("filtro-informe").textContent = filtros.tipoInforme;
  document.getElementById(
    "filtro-fechas"
  ).textContent = `${filtros.fechaInicio} al ${filtros.fechaFin}`;
  document.getElementById("filtro-tipo-reporte").textContent =
    filtros.tipoReporte;

  // Mostrar datos en la tabla
  const tbody = document.getElementById("reporte-body");
  tbody.innerHTML = "";

  datos.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.nombreInsumo}</td>
      <td>${item.entradas ?? 0}</td>
      <td>${item.salidas ?? 0}</td>
      <td>${item.stockActual ?? 0}</td>
    `;
    tbody.appendChild(row);
  });

  // Calcular métricas
  const totalConStock = datos.filter((item) => item.stockActual > 0).length;
  const totalEntradas = datos.reduce(
    (sum, item) => sum + (item.entradas || 0),
    0
  );
  const totalSalidas = datos.reduce(
    (sum, item) => sum + (item.salidas || 0),
    0
  );
  const totalCero = datos.filter((item) => item.stockActual === 0).length;

  // Mostrar métricas
  document.getElementById("card-insumos").textContent = totalConStock;
  document.getElementById("card-entradas").textContent = totalEntradas;
  document.getElementById("card-salidas").textContent = totalSalidas;
  document.getElementById("card-cero").textContent = totalCero;

  // Inicializar DataTable
  $("#dataTable").DataTable({
    destroy: true,
    responsive: true,
    autoWidth: false,
    searching: true,
    paging: true,
    ordering: true,
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ insumos",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
  });

  // Exportar PDF
  const btnPdf = document.getElementById("btn-pdf");
  if (btnPdf) {
    btnPdf.addEventListener("click", function () {
      const url = `/api/reporte/exportar/pdf?fechaInicio=${
        filtros.fechaInicio
      }&fechaFin=${filtros.fechaFin}&tipoInforme=${encodeURIComponent(
        filtros.tipoInforme
      )}`;
      window.open(url, "_blank");
    });
  }

  // Exportar Excel
  const btnExcel = document.getElementById("btn-excel");
  if (btnExcel) {
    btnExcel.addEventListener("click", function () {
      const url = `/api/reporte/exportar/excel?fechaInicio=${
        filtros.fechaInicio
      }&fechaFin=${filtros.fechaFin}&tipoInforme=${encodeURIComponent(
        filtros.tipoInforme
      )}`;
      window.open(url, "_blank");
    });
  }
});

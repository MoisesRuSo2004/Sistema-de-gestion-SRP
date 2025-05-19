const apiUrl = "http://localhost:8080/api/entradas"; // URL de la API

// 💡 INICIALIZAR DataTables con carga paginada desde el servidor
$(document).ready(function () {
  $("#dataTable").DataTable({
    serverSide: true, // Carga datos desde el servidor en cada página
    processing: true, // Muestra un indicador de carga
    responsive: true, // Tabla responsiva
    autoWidth: false,
    paging: true,
    ordering: true,
    searching: true,
    pageLength: 10, // Número de registros por página
    lengthMenu: [10, 20, 50, 100], // Opciones de paginación
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    ajax: async function (data, callback) {
      try {
        // Calcular página y tamaño
        const page = Math.floor(data.start / data.length);
        const size = data.length;

        // Fetch de la API con paginación
        const response = await fetch(`${apiUrl}?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error(`Error al obtener entradas: ${response.status}`);
        }

        const entradas = await response.json();
        console.log("Datos cargados:", entradas);

        // Formatear datos para el DataTable
        const formattedData = entradas
          .map((entrada) =>
            entrada.detalles.map((detalle) => ({
              nombre: detalle.nombre,
              fecha: entrada.fecha,
              descripcion: entrada.descripcion,
              cantidad: detalle.cantidad,
              acciones: `
              <a href="/entradas-edit?id=${detalle.insumoId}" onclick="editarEntrada('${entrada.id}')" class="btn btn-warning btn-circle">
                <i class="fas fa-pencil-alt"></i>
              </a>
              <a href="#" class="btn btn-danger btn-circle btn-eliminar" data-id="${entrada.id}">
                <i class="fas fa-trash"></i>
              </a>`,
            }))
          )
          .flat(); // Aplanar la estructura anidada

        callback({
          draw: data.draw,
          recordsTotal: 7500, // Ajusta el total si lo tienes
          recordsFiltered: 7500,
          data: formattedData,
        });
      } catch (error) {
        console.error("Error al obtener las entradas:", error);
      }
    },
    columns: [
      { data: "nombre", title: "Nombre" },
      { data: "fecha", title: "Fecha" },
      { data: "descripcion", title: "Descripción" },
      { data: "cantidad", title: "Cantidad" },
      {
        data: "acciones",
        title: "Acciones",
        orderable: false,
        searchable: false,
      },
    ],
  });
});

// ✅ Guardar el ID de la entrada en localStorage
function editarEntrada(idEntrada) {
  localStorage.setItem("entradaIdEditar", idEntrada);
}

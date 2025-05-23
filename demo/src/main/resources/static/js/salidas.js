const apiUrl = "http://localhost:8080/api/salidas"; // URL paginada del backend

$(document).ready(function () {
  $("#dataTable").DataTable({
    serverSide: true,
    processing: true,
    responsive: true,
    autoWidth: false,
    paging: true,
    ordering: true,
    searching: true,
    pageLength: 5,
    lengthMenu: [5, 20, 50, 100],
    language: {
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando _START_ a _END_ de _TOTAL_ salidas",
      paginate: {
        first: "Primero",
        last: "Último",
        next: "Siguiente",
        previous: "Anterior",
      },
    },
    ajax: async function (data, callback) {
      try {
        const page = Math.floor(data.start / data.length);
        const size = data.length;

        const response = await fetch(`${apiUrl}?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error(`Error al obtener salidas: ${response.status}`);
        }

        const json = await response.json();
        const salidas = json.data;

        const formattedData = salidas.map((salida) => {
          const nombres = salida.detalles.map((d) => d.nombre).join(", ");
          const cantidades = salida.detalles.map((d) => d.cantidad).join(", ");

          return {
            nombre: nombres,
            fecha: salida.fecha,
            descripcion: salida.descripcion,
            cantidad: cantidades,
            acciones: `
              <a href="/salidas-edit?id=${salida.id}" onclick="editarSalida('${salida.id}')" class="btn btn-primary btn-circle">
                <i class="fas fa-pencil-alt"></i>
              </a>
              <a href="#" class="btn btn-danger btn-circle btn-eliminar" data-id="${salida.id}">
                <i class="fas fa-trash"></i>
              </a>
            `,
          };
        });

        callback({
          draw: data.draw,
          recordsTotal: json.recordsTotal,
          recordsFiltered: json.recordsFiltered,
          data: formattedData,
        });
      } catch (error) {
        console.error("Error al obtener las salidas:", error);
      }
    },
    columns: [
      { data: "nombre", title: "Nombre(s)" },
      { data: "fecha", title: "Fecha" },
      { data: "descripcion", title: "Descripción" },
      { data: "cantidad", title: "Cantidad(es)" },
      {
        data: "acciones",
        title: "Acciones",
        orderable: false,
        searchable: false,
      },
    ],
  });
});

function editarSalida(id) {
  localStorage.setItem("SalidaIdEditar", id);
}

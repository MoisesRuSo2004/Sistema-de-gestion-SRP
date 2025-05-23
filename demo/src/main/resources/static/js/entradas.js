const apiUrl = "http://localhost:8080/api/entradas";

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
        const page = Math.floor(data.start / data.length);
        const size = data.length;

        const response = await fetch(`${apiUrl}?page=${page}&size=${size}`);
        if (!response.ok) {
          throw new Error(`Error al obtener entradas: ${response.status}`);
        }

        const json = await response.json();
        const entradas = json.data;

        const formattedData = entradas.map((entrada) => {
          const nombres = entrada.detalles.map((d) => d.nombre).join(", ");
          const cantidades = entrada.detalles.map((d) => d.cantidad).join(", ");

          return {
            nombre: nombres,
            fecha: entrada.fecha,
            descripcion: entrada.descripcion,
            cantidad: cantidades,
            acciones: `
              <a href="/entradas-edit?id=${entrada.id}" onclick="editarEntrada('${entrada.id}')" class="btn btn-primary btn-circle">
                <i class="fas fa-pencil-alt"></i>
              </a>
              <a href="#" class="btn btn-danger btn-circle btn-eliminar" data-id="${entrada.id}">
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
        console.error("Error al obtener las entradas:", error);
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

function editarEntrada(idEntrada) {
  localStorage.setItem("entradaIdEditar", idEntrada);
}

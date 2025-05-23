const apiUrl = "http://localhost:8080/api/insumos";

// Función para obtener y mostrar los insumos
async function obtenerInsumos() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener los insumos: ${response.status}`);
    }

    const insumos = await response.json();
    console.log("Insumos obtenidos:", insumos);

    const tbody = document.getElementById("tabla-insumos");
    tbody.innerHTML = ""; // Limpiamos el contenido

    insumos.forEach((insumo) => {
      tbody.innerHTML += `
        <tr>
          <td>${insumo.nombre}</td>
          <td>${insumo.stock}</td>
          <td>${insumo.unidadM}</td>
          <td>
            <a href="/editar?id=${insumo.id}" class="btn btn-primary btn-circle">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="#" class="btn btn-danger btn-circle btn-eliminar" data-id="${insumo.id}">
              <i class="fas fa-trash"></i>
            </a>
          </td>
        </tr>
      `;
    });

    // Asignar evento a cada botón de agregar entrada
    document.querySelectorAll(".btn-agregar-entrada").forEach((boton) => {
      boton.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("data-nombre");

        // Redirigir a la página de entradas-add con los parámetros
        window.location.href = `/entradas-add?id=${id}&nombre=${nombre}`;
      });
    });

    // Asignar evento a cada botón de agregar entrada
    document.querySelectorAll(".btn-agregar-salida").forEach((boton) => {
      boton.addEventListener("click", function (e) {
        e.preventDefault();
        const id = this.getAttribute("data-id");
        const nombre = this.getAttribute("data-nombre");

        // Redirigir a la página de entradas-add con los parámetros
        window.location.href = `/salidas-add?id=${id}&nombre=${nombre}`;
      });
    });

    // Inicializar DataTables después de cargar los datos
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
  } catch (error) {
    console.error("Error al obtener los insumos:", error);
  }
}

// Función para editar insumo
function editarInsumo(id) {
  window.location.href = `/editar?id=${id}`;
}

// Iniciar la carga de insumos cuando la página esté lista
document.addEventListener("DOMContentLoaded", () => {
  obtenerInsumos();
});

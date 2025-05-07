const apiUrl = "http://localhost:8080/api/insumos";

// Función para obtener y mostrar los insumos
async function obtenerInsumos() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener los insumos: ${response.status}`);
    }

    const insumos = await response.json();
    console.log("Insumos obtenidos:", insumos); // Verificar los datos obtenidos

    const tbody = document.getElementById("tabla-insumos");
    tbody.innerHTML = ""; // Limpiamos el contenido

    insumos.forEach((insumo) => {
      tbody.innerHTML += `
        <tr>
          
          <td>${insumo.nombre}</td>
          <td>${insumo.stock}</td>
          <td>${insumo.unidadM}</td>
          <td>
            <a href="/editar?id=${insumo.id}" onclick="editarInsumo(${insumo.id})" class="btn btn-warning btn-circle">
              <i class="fas fa-pencil-alt"></i>
            </a>
            <a href="${insumo.id}" class="btn btn-danger btn-circle btn-eliminar" data-id="${insumo.id}">
              <i class="fas fa-trash"></i>
            </a>
          </td>
        </tr>
      `;
    });

    // 💡 INICIALIZAR DataTables DESPUÉS DE CARGAR LOS DATOS
    $("#dataTable").DataTable({
      destroy: true, // Elimina la instancia previa para evitar errores
      responsive: true,
      autoWidth: false,
      searching: true, // Habilita el buscador
      paging: true, // Activa la paginación
      ordering: true, // Habilita el ordenamiento de columnas
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

function editarInsumo(id) {
  window.location.href = `editar.html?id=${id}`;
}

// Llamada a la función para cargar los insumos al cargar la página
obtenerInsumos();

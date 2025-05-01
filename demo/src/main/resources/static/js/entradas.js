const apiUrl = "http://localhost:8080/api/entradas"; // URL de la API para obtener las entradas

// Función para obtener y mostrar las entradas
async function obtenerEntradas() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener entradas: ${response.status}`);
    }

    const entradas = await response.json();
    console.log("Entradas obtenidas:", entradas); // Verificar los datos obtenidos

    const tbody = document.getElementById("tabla-entradas");
    tbody.innerHTML = ""; // Limpiamos el contenido anterior

    entradas.forEach((entrada) => {
      entrada.detalles.forEach((detalle) => {
        tbody.innerHTML += `
          <tr>
            <td>${detalle.nombre}</td>
            <td>${entrada.fecha}</td>
            <td>${entrada.descripcion}</td>
            <td>${detalle.cantidad}</td>
            <td>
              <a href="/editar?id=${detalle.insumoId}" onclick="editarInsumo('${detalle.insumoId}')" class="btn btn-warning btn-circle">
                <i class="fas fa-pencil-alt"></i>
              </a>
              <a href="${detalle.insumoId}" class="btn btn-danger btn-circle btn-eliminar" data-id="${detalle.insumoId}">
                <i class="fas fa-trash"></i>
              </a>
            </td>
          </tr>
        `;
      });
    });

    // 💡 INICIALIZAR DataTables DESPUÉS DE CARGAR LOS DATOS
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
        info: "Mostrando _START_ a _END_ de _TOTAL_ entradas",
        paginate: {
          first: "Primero",
          last: "Último",
          next: "Siguiente",
          previous: "Anterior",
        },
      },
    });
  } catch (error) {
    console.error("Error al obtener las entradas:", error);
  }
}

function editarInsumo(id) {
  window.location.href = `editar.html?id=${id}`;
}

// Ejecutar al cargar la página
obtenerEntradas();

const apiUrl = "http://localhost:8080/api/salidas"; // URL de la API para obtener las entradas

// Función para obtener y mostrar las entradas
async function obtenerSalidas() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener salidas: ${response.status}`);
    }

    const salidas = await response.json();
    console.log("salidas obtenidas:", salidas); // Verificar los datos obtenidos

    const tbody = document.getElementById("tabla-salidas");
    tbody.innerHTML = ""; // Limpiamos el contenido anterior

    salidas.forEach((salida) => {
      salida.detalles.forEach((detalle) => {
        tbody.innerHTML += `
          <tr>
            <td>${detalle.nombre}</td>
            <td>${salida.fecha}</td>
            <td>${salida.descripcion}</td>
            <td>${detalle.cantidad}</td>
            <td>
              <a onclick="editarSalida('${salida.id}')" href="/salidas-edit" class="btn btn-warning btn-circle">
                <i class="fas fa-pencil-alt"></i>
              </a>
              <a href="#" class="btn btn-danger btn-circle btn-eliminar" data-id="${salida.id}">
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
    console.error("Error al obtener las salidas:", error);
  }
}

function editarSalida(id) {
  localStorage.setItem("SalidaIdEditar", id);
}

// Ejecutar al cargar la página
obtenerSalidas();

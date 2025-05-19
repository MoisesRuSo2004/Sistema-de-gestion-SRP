document.addEventListener("DOMContentLoaded", function () {
  const token = document.querySelector('meta[name="_csrf"]').content;
  const header = document.querySelector('meta[name="_csrf_header"]').content;
  const form = document.getElementById("reporteForm");

  // Salir si el formulario no está presente en la vista
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const tipoInforme = document.getElementById("tipoInforme").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;
    const tipoReporte = document.querySelector(
      'input[name="tipoReporte"]:checked'
    )?.value;
    const soloMovimiento = document.getElementById("soloMovimiento").checked;

    if (!tipoInforme || !fechaInicio || !fechaFin || !tipoReporte) {
      alert("⚠️ Todos los campos son obligatorios.");
      return;
    }

    const filtro = {
      tipoInforme,
      fechaInicio,
      fechaFin,
      tipoReporte,
      soloMovimiento,
    };

    // Mostrar en consola para ver qué datos estamos enviando
    console.log("Enviando filtro: ", filtro);

    fetch("/api/reporte", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [header]: token, // ✅ aquí agregas el token CSRF al header dinámico
      },
      body: JSON.stringify(filtro),
    })
      .then((response) => response.json())
      .then((data) => {
        // Guardar los filtros y datos en sessionStorage
        sessionStorage.setItem("filtros", JSON.stringify(filtro));
        sessionStorage.setItem("datosReporte", JSON.stringify(data));

        // Verificar que los datos están siendo guardados correctamente
        console.log("Datos guardados en sessionStorage: ", data);

        // Redirigir a la página de reporte generado
        window.location.href = "/generar-reporte";
      })
      .catch((error) => {
        console.error("Error al generar el reporte:", error);
        alert("❌ Error al generar el reporte. Intenta nuevamente.");
      });
  });
});

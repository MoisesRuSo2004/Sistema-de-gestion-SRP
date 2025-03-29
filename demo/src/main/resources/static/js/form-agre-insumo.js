// Validación del formulario
(function () {
  "use strict";
  var form = document.getElementById("insumoForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Si el formulario es válido, simplemente se resetea
    form.reset();
    form.classList.remove("was-validated");
  });
})();

// Limpiar formulario
document.getElementById("btnLimpiar").addEventListener("click", function () {
  var form = document.getElementById("insumoForm");
  form.reset();
  form.classList.remove("was-validated");
});

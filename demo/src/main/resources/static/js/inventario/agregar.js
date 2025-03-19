// Validación del formulario
(function () {
  "use strict";
  var forms = document.querySelectorAll(".needs-validation");
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          alert("Insumo registrado correctamente.");
          form.reset();
          form.classList.remove("was-validated");
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// Limpiar formulario
document.getElementById("btnLimpiar").addEventListener("click", function () {
  document.getElementById("insumoForm").reset();
  document.getElementById("insumoForm").classList.remove("was-validated");
  document.getElementById("otroProveedor").style.display = "none";
});

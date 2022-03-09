const inciarLogin = document.getElementById("form_password");

inciarLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  validarPassword();
});

function validarPassword() {
  if (localStorage.getItem("listaDeDatos")) {
    let list = JSON.parse(localStorage.getItem("listaDeDatos"));

    for (const item of list) {
      if (
        `${item.correo}` == document.getElementById("confirm_email").value &&
        `${item.password}` == document.getElementById("confirm_password").value
      ) {
        Swal.fire({
          icon: "success",
          title: "Perfecto!!",
          text: "Disfruta la Pagina",
          showConfirmButton: false,
          footer: '<a href="pagina_2.html">!!!OK!!!</a>',
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "OOPS!!",
          text: "Tus datos no son iguales",
          showConfirmButton: true,
        });
      }
    }
  }
}

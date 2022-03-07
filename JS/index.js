window.onload = () => {
  const formulario = document.getElementById("form_principal");
  const inputs = document.querySelectorAll("#form_principal input");

  const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,12}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/, // 7 a 14 numeros.
  };

  const campos = {
    usuario: false,
    nombre: false,
    password: false,
    correo: false,
    telefono: false,
  };

  const validarFormulario = (e) => {
    switch (e.target.name) {
      case "usuario":
        validarCampo(expresiones.usuario, e.target, "usuario");
        break;
      case "nombre":
        validarCampo(expresiones.nombre, e.target, "nombre");
        break;
      case "password":
        validarCampo(expresiones.password, e.target, "password");
        validarPassword2();
        break;
      case "password2":
        validarPassword2();
        break;
      case "correo":
        validarCampo(expresiones.correo, e.target, "correo");
        break;
      case "telefono":
        validarCampo(expresiones.telefono, e.target, "telefono");
        break;
    }
  };

  const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
      document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-incorrecto");
      document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-correcto");
      document.querySelector(`#grupo__${campo} i`).classList.add("fa-check-circle");
      document.querySelector(`#grupo__${campo} i`).classList.remove("fa-times-circle");
      document.querySelector(`#grupo__${campo} .msg_error`).classList.remove("formulario__input-error-activo");
      campos[campo] = true;
    } else {
      document.getElementById(`grupo__${campo}`).classList.add("formulario__grupo-incorrecto");
      document.getElementById(`grupo__${campo}`).classList.remove("formulario__grupo-correcto");
      document.querySelector(`#grupo__${campo} i`).classList.add("fa-times-circle");
      document.querySelector(`#grupo__${campo} i`).classList.remove("fa-check-circle");
      document.querySelector(`#grupo__${campo} .msg_error`).classList.add("formulario__input-error-activo");
      campos[campo] = false;
    }
  };

  const validarPassword2 = () => {
    const inputPassword1 = document.getElementById("password");
    const inputPassword2 = document.getElementById("password2");

    if (inputPassword1.value !== inputPassword2.value) {
      document.getElementById(`grupo__password2`).classList.add("formulario__grupo-incorrecto");
      document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-correcto");
      document.querySelector(`#grupo__password2 i`).classList.add("fa-times-circle");
      document.querySelector(`#grupo__password2 i`).classList.remove("fa-check-circle");
      document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.add("formulario__input-error-activo");
      campos["password"] = false;
    } else {
      document.getElementById(`grupo__password2`).classList.remove("formulario__grupo-incorrecto");
      document.getElementById(`grupo__password2`).classList.add("formulario__grupo-correcto");
      document.querySelector(`#grupo__password2 i`).classList.remove("fa-times-circle");
      document.querySelector(`#grupo__password2 i`).classList.add("fa-check-circle");
      document.querySelector(`#grupo__password2 .formulario__validacion-estado`).classList.remove("formulario__input-error-activo");
      campos["password"] = true;
    }
  };

  inputs.forEach((input) => {
    input.addEventListener("keyup", validarFormulario);
    input.addEventListener("blur", validarFormulario);
  });

  let lisDato = [];

  function addListDatos(Susuario, Snombre, Spassword, Scorreo, Stelefono) {
    let newData = {
      usuario: Susuario,
      nombre: Snombre,
      password: Spassword,
      correo: Scorreo,
      telefono: Stelefono,
    };

    lisDato.push(newData);
  }
  function saveData() {
    let usu = document.getElementById("usuario").value,
      nom = document.getElementById("nombre").value,
      pas = document.getElementById("password").value,
      cor = document.getElementById("correo").value,
      tel = document.getElementById("telefono").value;

    addListDatos(usu, nom, pas, cor, tel);
  }
  function saveStorage() {
    let dataSave = JSON.stringify(lisDato);
    localStorage.setItem("listaDeDatos", dataSave);
  }
  function mensaje() {
    Swal.fire({
      icon: "success",
      title: "Genial!!",
      text: "Acabas de Registrarte en tu Biblioteca Digital.",
      showConfirmButton: false,
      footer:
        '<a href="registro_password.html">!!!Click Aqui para Continuar!!!</a>',
    });
  }
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const terminos = document.getElementById("terminos");
    if (
      campos.usuario &&
      campos.nombre &&
      campos.password &&
      campos.correo &&
      campos.telefono &&
      terminos.checked
    ) {
      saveData();
      saveStorage();
      formulario.reset();
      mensaje();
      document
        .getElementById("formulario__mensaje")
        .classList.remove("msg_enviar_error");
    } else {
      document
        .getElementById("formulario__mensaje")
        .classList.add("msg_enviar_error");
    }
  });
};

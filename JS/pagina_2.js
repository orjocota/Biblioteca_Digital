//Se cargar los datos guardados el localStorage y se inprime en el hrml solo con el nombre del Usuario que ingreso a manera de Saludo

document.addEventListener("DOMContentLoaded", function () {
  imprimirData();
});
function imprimirData() {
  let list = JSON.parse(localStorage.getItem("listaDeDatos")) || [];
  let cuerpo = document.getElementById("section_nombre");
  for (const item of list) {
    let contenedor = document.getElementById("section_h1");
    contenedor.innerHTML = `Hola, <span>${item.nombre}</span> Bienvenido.`;
    contenedor.setAttribute("class", "section_1");
    cuerpo.appendChild(contenedor);
  }
}

/*En esta parte removemos el DOM principal y Mostramos un formulario para que el cliente ingrese el libro que desea.*/

let botonIngresar = document.getElementById("btn_ingresar");

botonIngresar.addEventListener("click", function () {
  let padre = document.getElementById("cuerpo");
  let hijo = document.getElementById("caja_btn");
  padre.removeChild(hijo);

  let div = document.getElementById("titulo_form");
  let h2 = document.createElement("h2");
  h2.textContent = `Ingresa por favor tu Libro`;
  div.appendChild(h2);
  document.getElementById("form2").classList.remove("form_p");
  document.getElementById("form2").classList.add("form2");
});

/* SECCION INGRESAR LIBROS AL LOCALSTORAGE*/

class CrearLibrosNuevo {
  constructor(fecha, titulo, autor, year, genero, descripcion) {
    this.fecha = fecha;
    this.titulo = titulo;
    this.autor = autor;
    this.year = year;
    this.genero = genero;
    this.descripcion = descripcion;
  }
}

let Books = [];

function tomaDeLibros() {
  let titulo = document.getElementById("ing_titulo").value,
    autor = document.getElementById("ing_autor").value,
    year = document.getElementById("ing_year").value,
    genero = document.getElementById("ing_genero").value,
    descripcion = document.getElementById("ing_descripcion").value,
    fecha = document.getElementById("ing_fecha").value;

  if (
    titulo != "" &&
    autor != "" &&
    !isNaN(year) &&
    year.length == 4 &&
    genero != "" &&
    descripcion != "" &&
    fecha != ""
  );

  Books.push(
    new CrearLibrosNuevo(fecha, titulo, autor, year, genero, descripcion)
  );
}

function saveStorageLibros() {
  let datoLocaS = JSON.parse(localStorage.getItem("listaDeLibros")) || [];
  datoLocaS.push(Books);
  let dataSaveLibros = JSON.stringify(datoLocaS);
  localStorage.setItem("listaDeLibros", dataSaveLibros);
}

function mensajeDespuesPost() {
  Swal.fire({
    icon: "success",
    title: "Genial!!",
    text: "Acabas de Registar tu libro en tu Biblioteca.",
    showConfirmButton: false,
    footer:
      '<a href="pagina_2.html"><h2 style="color:grey">!!!Click Aqui para Regresar!!!</h2></a>',
  });
}
let form = document.getElementById("form_2");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tomaDeLibros();
  saveStorageLibros();
  mensajeDespuesPost();
  form.reset();
});

//-----------------------SECCION DE VER LA LISTA DE LIBROS INGRESADOS------------------------------>

document.getElementById("btn_ver_libro").addEventListener("click", function () {
  mostraTabla();
  mostrarLibros();
});

function mostraTabla() {
  let padre = document.getElementById("cuerpo");
  let hijo = document.getElementById("caja_btn");
  padre.removeChild(hijo);
  document
    .getElementById("table-mostrar-libros")
    .classList.remove("table-mostrar-libros_none");
  document
    .getElementById("table-mostrar-libros")
    .classList.add("table-mostrar-libros");
}

function mostrarLibros() {
  let librosLocalS = JSON.parse(localStorage.getItem("listaDeLibros"));
  console.log(librosLocalS);
  let mostrarLibros = document.getElementById("mostrarLibros");
  mostrarLibros.innerHTML = "";
  for (const item of librosLocalS) {
    mostrarLibros.innerHTML += ` 
        <tr>
          <td>${item[0].titulo}</td>
          <td>${item[0].autor}</td>
          <td>${item[0].year}</td>
          <td>${item[0].genero}</td>
          <td>${item[0].descripcion}</td>
          <td>${item[0].fecha}</td>
        </tr> `;
  }
}

//-----------------------SECCION PARA BUSCAR LIBROS NUEVOS DESDE UNA API------------------------------>

document
  .getElementById("btn_buscar_libro")
  .addEventListener("click", function () {
    let padre = document.getElementById("cuerpo");
    let hijo = document.getElementById("caja_btn");
    padre.removeChild(hijo);
    document
      .getElementById("buscar_libro_caja")
      .classList.remove("buscar_libro_caja-none");
    document
      .getElementById("buscar_libro_caja")
      .classList.add("buscar_libro_caja");
  });

document
  .getElementById("btn-buscar_libro")
  .addEventListener("click", function () {
    let dataBuscar = document.getElementById("in-buscar-libro").value;
    let respuesta = document.getElementById("respuesta");
    respuesta.setAttribute("class", "respuesta");
    let url = "",
      img = "",
      titulo = "",
      autor = "",
      tarjeta = "";

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${dataBuscar}`)
      .then((handleResponse) => handleResponse.json())
      .then((libros) => {
        respuesta.innerHTML = "";
        for (let i = 0; i < libros.items.length; i++) {
          titulo = libros.items[i].volumeInfo.title;
          autor = libros.items[i].volumeInfo.authors;
          url = libros.items[i].volumeInfo.infoLink;
          img = libros.items[i].volumeInfo.imageLinks.thumbnail;
          tarjeta = ` <div class="card-respuetsa">
                    <h3 class="titulo-Libro">Titulo: </br> ${titulo}</h3>               
                    <div class="caja-img-respuesta">
                    <img src="${img}" alt="Libro de ${autor}">
                    </div>
                    <h4 class="titulo-autor">Autor: ${autor}</h4>
                    <a href="${url}" target="blank"><button class="boton-libros-bus">Ver mas Info</button></a>
                    </div>`;

          respuesta.innerHTML += tarjeta;
        }
      });
  });

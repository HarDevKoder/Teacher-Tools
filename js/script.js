// Referecio objetos del DOM
const txtDatos = document.querySelector("#txtDatos");
const btnOrdenar = document.querySelector("#btnOrdenar");
const btnCopiar = document.querySelector("#btnCopiar");
const btnBorrar = document.querySelector("#btnBorrar");
const toastCopiar = document.querySelector("#toastCopiar");

// Función que Ordena los datos
const ordenarDatos = () => {
  let datos = txtDatos.value.trim();
  var respuesta = confirm("¿Deseas agregar numeros a la lista");
  let mensaje = "";
  datos = datos.split("\n").sort();
  datos.forEach((linea, indice) => {
    if (respuesta) {
      mensaje += `${indice + 1}- ${linea}\n`;
    } else {
      mensaje += `${linea}\n`;
    }
  });

  txtDatos.value = mensaje;
};

// Función que Borra el texarea
const borrardatos = () => {
  txtDatos.value = "";
};

// Función que copia contenido del textArea al portapapeles
const copiarAlPortapapeles = () => {
  toastCopiar.style.display = "block";
  navigator.clipboard
    .writeText(txtDatos.value)
    .then(() => {
      console.log("Texto copiado al portapapeles.");
    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles:", err);
    });

  setTimeout(() => {
    toastCopiar.style.display = "none";
  }, 1000);
  borrardatos();
};


// PROGRAMA PRINCIPAL

// Oculto mensaje toast de copiado
toastCopiar.style.display = "none";

// Botón que ordena los datos
btnOrdenar.addEventListener("click", ordenarDatos);

// Botón que borra el contenido del textArea
btnBorrar.addEventListener("click", borrardatos);

// Botón que copia el contenido del textArea al portapapeles
btnCopiar.addEventListener("click", copiarAlPortapapeles);
// -----------------------------------------------------------------------
// LIBRERIA DE FUNCIONES A UTILIZAR EN EL PROYECTO
// -----------------------------------------------------------------------
// Comprobación e Compatibilidad con service Worker (PWA)
// -----------------------------------------------------------------------
export const verificarServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("Registro de SW exitoso", reg))
      .catch((err) => console.warn("Error al tratar de registrar el sw", err));
  }
};

// Referencias a los elementos del DOM
export const referenciasDom = () => {
  return {
    txtDatos: document.querySelector("#txtDatos"),
    btnOrdenar: document.querySelector("#btnOrdenar"),
    btnCopiar: document.querySelector("#btnCopiar"),
    btnBorrar: document.querySelector("#btnBorrar"),
    toastCopiar: document.querySelector("#toastCopiar"),
  };
};

// Función que Limpia texto ingresado y lo convierte a minusculas

const mayusculaInicialTexto = (texto) => {
  let cadenaFinal = " ",
    textoLimpioMinusculas,
    arrayTexto,
    letraInicial;

  textoLimpioMinusculas = texto
    .trim()
    .replace(/^[^a-zA-Z]*/, "")
    .toLowerCase();
  arrayTexto = textoLimpioMinusculas.split(" ");
  arrayTexto.forEach((palabra) => {
    palabra = palabra.split("");
    letraInicial = palabra.shift();
    palabra.unshift(letraInicial.toUpperCase());
    palabra = palabra.join("");
    cadenaFinal += palabra + " ";
  });

  return cadenaFinal.trim();
};

// Función que Ordena los datos
export const ordenarDatos = () => {
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
export const borrardatos = () => {
  txtDatos.value = "";
};

// Función que copia contenido del textArea al portapapeles
export const copiarAlPortapapeles = () => {
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

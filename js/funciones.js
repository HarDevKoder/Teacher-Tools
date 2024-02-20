// -----------------------------------------------------------------------
// LIBRERIA DE FUNCIONES A UTILIZAR EN EL PROYECTO
// -----------------------------------------------------------------------
// Comprobación de Compatibilidad con service Worker (PWA)
// -----------------------------------------------------------------------
export const verificarServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("./sw.js")
      .then((reg) => console.log("Registro de SW exitoso", reg))
      .catch((err) => console.warn("Error al tratar de registrar el sw", err));
  }
};

// -----------------------------------------------------------------------
// Referencias a los elementos del DOM
// -----------------------------------------------------------------------
export const referenciasDom = () => {
  return {
    txtDatos: document.querySelector("#txtDatos"),
    btnOrdenar: document.querySelector("#btnOrdenar"),
    btnCopiar: document.querySelector("#btnCopiar"),
    btnBorrar: document.querySelector("#btnBorrar"),
    toastCopiar: document.querySelector("#toastCopiar"),
  };
};

// -----------------------------------------------------------------------
// Función que Limpia texto ingresado y lo convierte a minusculas
// -----------------------------------------------------------------------
const mayusculaInicialTexto = (texto) => {
  let cadenaFinal = "",
    lineas = "",
    arrayTexto = [],
    letraInicial = "";

  lineas = texto.split("\n");
  lineas.forEach((linea) => {
    linea = linea
      .trim()
      .replace(/^[^a-zA-Z]*/, "")
      .toLowerCase();
    arrayTexto = linea.split(" ");
    arrayTexto.forEach((palabra) => {
      palabra = palabra.split("");

      if (palabra.length > 0) {
        letraInicial = palabra.shift();
        palabra.unshift(letraInicial.toUpperCase());
        palabra = palabra.join("");
        cadenaFinal += palabra + " ";
      }
    });
    cadenaFinal = cadenaFinal.trim() + "\n";
  });

  return cadenaFinal.trim();
};

// -----------------------------------------------------------------------
// Función que Ordena los datos
// -----------------------------------------------------------------------
export const ordenarDatos = async () => {
  let datos = txtDatos.value;
  let datosLimpios = mayusculaInicialTexto(datos);
  var respuesta = await mensajeConfirmacionSweetAlert();
  let mensaje = "";
  datosLimpios = datosLimpios.split("\n").sort();
  datosLimpios.forEach((linea, indice) => {
    if (respuesta) {
      mensaje += `${indice + 1}- ${linea}\n`;
    } else {
      mensaje += `${linea}\n`;
    }
  });

  txtDatos.value = mensaje;
};

// -----------------------------------------------------------------------
// Función que Borra el textarea
// -----------------------------------------------------------------------
export const borrardatos = () => {
  txtDatos.value = "";
};

// -----------------------------------------------------------------------
// Función que copia contenido del textArea al portapapeles
// -----------------------------------------------------------------------
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
};

// -----------------------------------------------------------------------
// Mensaje sweet alert para confimación de agregar o no numeros a la lista
// -----------------------------------------------------------------------
export const mensajeConfirmacionSweetAlert = () => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: "Se va a generar la lista ordenada...",
      text: "Deseas agregar numeración?",
      background: "floralwhite",
      icon: "info",
      iconColor: "#3085d6",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      customClass: {
        confirmButton: "btn-size",
        cancelButton: "btn-size",
        popup: "alert-size",
        title: "title-style",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Proceso exitoso!",
          text: "La lista ha sido generada",
          background: "floralwhite",
          icon: "success",
          iconColor: "#7FFF00",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "alert-size",
            title: "title-style",
          },
        });
        resolve(true);
      } else {
        Swal.fire({
          title: "Proceso exitoso!",
          text: "La lista ha sido generada",
          background: "floralwhite",
          icon: "success",
          iconColor: "#7FFF00",
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            popup: "alert-size",
            title: "title-style",
          },
        });
        resolve(false);
      }
    });
  });
};

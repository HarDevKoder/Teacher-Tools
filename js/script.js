// Importo referencias del DOM
import { 
  referenciasDom, 
  ordenarDatos, 
  borrardatos, 
  copiarAlPortapapeles } 
from "./funciones.js";

// PROGRAMA PRINCIPAL

// referencio Eementos del DOM
referenciasDom();

// Oculto mensaje toast de copiado
toastCopiar.style.display = "none";

// Botón que ordena los datos
btnOrdenar.addEventListener("click", ordenarDatos);

// Botón que borra el contenido del textArea
btnBorrar.addEventListener("click", borrardatos);

// Botón que copia el contenido del textArea al portapapeles
btnCopiar.addEventListener("click", copiarAlPortapapeles);

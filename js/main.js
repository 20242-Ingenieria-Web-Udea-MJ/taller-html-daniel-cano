const btns = document.querySelector(".btns");
const screenInput = document.querySelector(".screen input");

const zeroDivisionMsg = "Error: división por cero";
let screenValue = "";

/**
 * Función para calcular el resultado de la expresión matemática en la pantalla.
 * Usa la función eval() para evaluar la expresión y maneja posibles errores como
 * división por cero y errores de sintaxis.
 */
const calculateResult = () => {
  if (!screenInput.value) return;

  try {
    const result = eval(screenInput.value);

    if (!Number.isFinite(result)) throw new Error(zeroDivisionMsg);

    screenInput.value = screenValue = result;
  } catch (error) {
    // Muestra el mensaje de error específico para división por cero, o un mensaje de error de sintaxis general
    screenInput.value = error.message.includes(zeroDivisionMsg)
      ? error.message
      : "Syntax Error";

    screenValue = "";
  }
};

/**
 * Función para limpiar la pantalla de la calculadora.
 * Resetea tanto el campo de entrada como la variable screenValue.
 */
const clearScreen = () => {
  screenInput.value = "";
  screenValue = "";
};

btns.addEventListener("click", (e) => {
  // Verifica si el clic no fue en un botón, en cuyo caso no hace nada.
  if (e.target.classList.contains("btns")) return;

  // Encuentra el botón que se ha clicado y obtiene su atributo data-btn.
  const btn = e.target.closest("button");
  const dataAttr = btn.getAttribute("data-btn");

  if (dataAttr === "=") {
    calculateResult();
    return;
  }

  if (dataAttr === "reset") {
    clearScreen();
    return;
  }

  screenValue += e.target.getAttribute("data-btn");
  screenInput.value = screenValue;
});

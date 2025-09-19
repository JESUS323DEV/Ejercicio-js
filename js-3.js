//============================== ADIVINA EL NÚMERO ==================================

// Genera un número secreto aleatorio entre 1 y 100
let randomNumber = Math.floor(Math.random() * 100) + 1;

//---------------------------------- CAPTURA DEL DOM --------------------------------
// Capturamos los elementos de texto donde vamos a mostrar resultados
const resultado = document.querySelector(".resultado");      // historial de intentos
const lastResultado = document.querySelector(".lastResultado"); // último resultado (acierto, fallo, fin del juego)
const win = document.querySelector(".win");                  // mensajes de pista (alto/bajo o acierto)

// Capturamos botón y campo de entrada
const btnEnviar = document.querySelector(".btnEnviar");      // botón de enviar intento
const guessField = document.querySelector(".guessField");    // input donde el jugador escribe

//---------------------------------- VARIABLES DE ESTADO -----------------------------
let guessCount = 1;   // contador de intentos
let resetButton;      // referencia al botón de reinicio (se crea dinámicamente)

//---------------------------------- EVENTOS -----------------------------------------
btnEnviar.addEventListener("click", checkGuess); // al hacer click en "Enviar" → ejecuta checkGuess()

//---------------------------------- FUNCIÓN PRINCIPAL -------------------------------
function checkGuess() {
    // Guardamos el valor del input convertido a número
    const userGuess = Number(guessField.value);

    // Primero validamos que sea un número
    if (isNaN(userGuess)) {
        lastResultado.textContent = "❌ Solo números, por favor";
        lastResultado.style.backgroundColor = ""
        return; // no seguimos ejecutando

    }

    // En el primer intento, pintamos la cabecera del historial
    if (guessCount === 1) {
        resultado.textContent = "Intentos anteriores: ";
    }
    // Añadimos el número que acaba de escribir el usuario al historial
    resultado.textContent += userGuess + " ";



    // --- CONDICIONES PRINCIPALES DEL JUEGO ---
    if (userGuess === randomNumber) {
        // Caso: ¡acertó!
        win.textContent = " 🎉 ¡Acertaste!";
        win.style.backgroundColor = "green";
        win.style.textAlign = "center";
        lastResultado.textContent = " "; // limpia mensajes anteriores
        setGameOver(); // desactiva juego y muestra botón reinicio

    } else if (guessCount === 10) {
        // Caso: llegó al intento nº 10 → fin del juego
        lastResultado.textContent = "¡¡ Fin del juego !!";
        setGameOver();

    } else {
        // Caso: incorrecto (ni acierto ni fin de juego todavía)
        lastResultado.textContent = " ¡Incorrecto! ";
        lastResultado.style.backgroundColor = "red";

        // Pistas: ¿el número es más bajo o más alto?
        if (userGuess < randomNumber) {
            win.textContent = "¡¡ El número es muy bajo !!";
        } else if (userGuess > randomNumber) {
            win.textContent = "¡¡ El número es muy alto !!";
        }
    }

    // Sumamos 1 intento más
    guessCount++;

    // Vaciamos el input y devolvemos el cursor al campo
    guessField.value = "";
    guessField.focus();
}

//---------------------------------- FUNCIÓN DE FIN DEL JUEGO ------------------------
function setGameOver() {
    // Bloquea input y botón de enviar
    guessField.disabled = true;
    btnEnviar.disabled = true;

    // Crea un nuevo botón en el DOM para reiniciar la partida
    resetButton = document.createElement("button");
    resetButton.textContent = "Iniciar nuevo juego";

    // 👉 En lugar de document.body, lo metes en el contenedor .controls
    const controls = document.querySelector(".botones");
    controls.append(resetButton);
    // Al hacer click en el nuevo botón, ejecuta resetGame()
    resetButton.addEventListener("click", resetGame);
}

//---------------------------------- FUNCIÓN DE REINICIO -----------------------------
function resetGame() {
    // Reinicia el contador de intentos
    guessCount = 1;

    // Limpia los mensajes y el historial
    resultado.textContent = "";
    lastResultado.textContent = "";
    win.textContent = "";

    // Borra el botón de reinicio del DOM
    resetButton.parentNode.removeChild(resetButton);

    // Reactiva input y botón de enviar
    guessField.disabled = false;
    btnEnviar.disabled = false;
    guessField.value = "";
    guessField.focus();

    // Genera un nuevo número aleatorio para la nueva partida
    randomNumber = Math.floor(Math.random() * 100) + 1;
}


//---------------------------------- ADIVINA LA PALABRA  -----------------------------
const palabras = ["gato", "perro", "raton", "ave", "pez",]
let palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
let progreso = Array(palabraSecreta.length).fill("_");
let intentos = 0;
let resetWord;

//Capturamos input,botones y clases 
const progresoTexto = document.querySelector(".progreso");
const resultadoWord = document.querySelector(".resultadoWord");
const inputWord = document.querySelector(".inputWord");
const btnProbar = document.querySelector(".btnProbar");
const labelWord = document.querySelector(".labelWord")

// Mostrar el progreso inicial con guiones bajos
progresoTexto.textContent = progreso.join("");
// Evento al pulsar el botón
btnProbar.addEventListener("click", checkLetter);

function checkLetter() {
    const letra = inputWord.value.toLowerCase(); // letra introducida

    // Validación
    if (!/^[a-zñ]$/.test(letra)) {
        resultadoWord.textContent = "❌ Introduce solo una letra";
        inputWord.value = "";
        inputWord.focus();
        return;
    }

    let acierto = false;

    // Recorremos la palabra secreta
    for (let i = 0; i < palabraSecreta.length; i++) {
        if (palabraSecreta[i] === letra) {
            progreso[i] = letra;
            acierto = true;
        }
    }

    // Mostrar progreso
    progresoTexto.textContent = progreso.join(" ");

    if (!acierto) {
        intentos++;
        resultadoWord.textContent = "Fallaste (" + intentos + " intentos)";
    } else {
        resultadoWord.textContent = "¡Bien! La letra está.";
    }

    // Victoria
    if (!progreso.includes("_")) {
        resultadoWord.textContent = "🎉 ¡Ganaste! La palabra era " + palabraSecreta;
        resultadoWord.style.backgroundColor = "green"
        btnProbar.disabled = true;
        labelWord.textContent = "";
        setGameOverWord()
    }


    // Derrota
    if (intentos >= 10) {
        resultadoWord.textContent = "❌ Perdiste. La palabra era " + palabraSecreta;
        resultadoWord.style.backgroundColor = "red"
        btnProbar.disabled = true;
        setGameOverWord()
    }

    // Limpiar input
    inputWord.value = "";
    inputWord.focus();
}
//Creamos botón 
function setGameOverWord() {
    //desactivamos input
    inputWord.disabled = true;

    //creamos botón reset
    resetWord = document.createElement("button");
    resetWord.textContent = "Iniciar nuevo juego"
    //colocamos el botón
    const btnProbarWord = document.querySelector(".btnProbarWord");
    btnProbarWord.append(resetWord);
    btnProbarWord.addEventListener("click", resetWord);
    // Al hacer click en el nuevo botón, ejecuta ResetGameWord()
    resetWord.addEventListener("click", ResetGameWord);

}
//Reset game
function ResetGameWord() {

    // Reinicia el contador de intentos
    intentos = 1;
    //LIMPIAMOS DATOS
    progresoTexto.textContent = "";
    resultadoWord.textContent = "";
    // Borra el botón de reinicio del DOM

    resetWord.parentNode.removeChild(resetWord);
    inputWord.disabled = false;
    btnProbar.disabled = false;

    palabraSecreta = palabras[Math.floor(Math.random() * palabras.length)];
    progreso = Array(palabraSecreta.length).fill("_");
}


//---------------------------------- MINIJUEGO LANZAR MONEDA CARA O SELLO  -----------------------------


//---------------------------------- CAPTURA DEL DOM --------------------------------
let btnLanzarMoneda = document.querySelector(".btnLanzarMoneda");
let btnReiniciar = document.querySelector(".btnReiniciar");
let imgMoneda = document.querySelector(".imgMoneda");
let textoRapido = document.querySelector(".textoRapido");
let resetCoin;
// BOTÓN LANZAR MONEDA + FUNCTION 
btnLanzarMoneda.addEventListener("click", function () {

    // Leo la elección del jugador
    let eleccion = document.querySelector("input[name='eleccion']:checked");
    if (!eleccion) {

        textoRapido.textContent = "⚠️ Tienes que elegir Cara o Sello primero.";
        return;
    }

    imgMoneda.classList.add("animar");
    imgMoneda.addEventListener("animationend", () => {
        imgMoneda.classList.remove("animar");

        // Lanza moneda
        let lanzarMoneda = Math.floor(Math.random() * 2);
        let salida = (lanzarMoneda === 0) ? "cara" : "sello";
        // Cambia imagen
        imgMoneda.src = salida === "cara" ? "cara-euro.png" : "sello-euro.png"

        //Verifica si ganó 

        if (eleccion.value === salida) {

            textoRapido.textContent = " 🎉 ¡Ganaste! Salió " + salida;


        } else {
            textoRapido.textContent = "😢 Perdiste. Salió " + salida;

        }

        // esconder moneda y bloquear el botón de jugar
        imgMoneda.style.display = "none";
        document.querySelector(".opciones").style.display = "none";
        btnLanzarMoneda.disabled = true;


        // mostrar el botón de reinicio
        btnReiniciar.style.display = "inline-block";


    }, { once: true });
});

// botón de reiniciar
btnReiniciar.addEventListener("click", function () {
    // resetear estado
    imgMoneda.style.display = "block"; // vuelve a aparecer
    textoRapido.textContent = "";
    btnLanzarMoneda.disabled = false; // desbloquear botón
    btnReiniciar.style.display = "none"; // ocultar reinicio

    // mostrar radios otra vez
    document.querySelector(".opciones").style.display = "block";

    // desmarcar radios
    let radios = document.querySelectorAll("input[name='eleccion']");
    radios.forEach(radio => radio.checked = false);
});





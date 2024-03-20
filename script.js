const textBox = document.getElementById("textBox");
const btnEncriptar = document.getElementById("btnEncriptar");
const btnDesencriptar = document.getElementById("btnDesencriptar");
const btnCopiar = document.getElementById("btnCopiar");
const textoRespuesta = document.getElementById("textoRespuesta");
const noTexto = document.querySelector(".noTexto");
const rta = document.querySelector(".rta");

document.querySelector(".rta").style.display = "none";

// Evento input para el textarea
textBox.addEventListener("input", function () {
  // Obtener el texto del textarea
  let texto = textBox.value;

  // Convertir texto a minúsculas y eliminar acentos
  texto = texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  // Establecer el texto modificado en el textarea
  textBox.value = texto;
});

function accionEncriptar(texto) {
  const encriptar = {
    e: "enter",
    i: "imes",
    a: "ai",
    o: "ober",
    u: "ufat",
  };
  return texto.replace(/[eiaou]/g, (letra) => encriptar[letra]);
}

function accionDesencriptar(texto) {
  const desencriptar = {
    enter: "e",
    imes: "i",
    ai: "a",
    ober: "o",
    ufat: "u",
  };

  return texto.replace(
    /(enter|imes|ai|ober|ufat)/g,
    (match) => desencriptar[match]
  );
}

// Evento click para encriptar texto
btnEncriptar.addEventListener("click", function () {
  const mensaje = textBox.value.trim(); // Obtener el texto del textarea
  const texto = accionEncriptar(mensaje); // Encriptar el texto
  textoRespuesta.value = texto; // Mostrar el texto encriptado en el textarea de respuesta
  textBox.value = ""; //vaciar textarea

  //Esconder elementos de noText
  document.querySelector(".noTexto").style.display = "none";
  document.querySelector(".rta").style.display = "block";
});

// Evento click para desencriptar texto
btnDesencriptar.addEventListener("click", function () {
  const mensaje = textBox.value.trim(); // Obtener el texto del textarea
  const texto = accionDesencriptar(mensaje); // Desencriptar el texto
  textoRespuesta.value = texto; // Mostrar el texto desencriptado en el textarea de respuesta
  textBox.value = ""; //vaciar textarea

  //Esconder elementos de noText
  document.querySelector(".noTexto").style.display = "none";
  document.querySelector(".rta").style.display = "block";
});

// Evento click para copiar texto
document
  .getElementById("btnCopiar")
  .addEventListener("click", async function () {
    const textoCopiar = document.getElementById("textoRespuesta").value;
    try {
      await navigator.clipboard.writeText(textoCopiar); // Utiliza textoCopiar en lugar de textoRespuesta
      alert("Texto copiado con éxito!");
    } catch (err) {
      alert("No se pudo copiar el texto: ", err);
    }

    textoRespuesta.value = ""; // Limpiar el texto de respuesta
    document.querySelector(".noTexto").style.display = "block"; // Mostrar elementos ocultos de noTexto
    document.querySelector(".rta").style.display = "none"; // Ocultar elementos de respuesta
  });

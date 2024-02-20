let script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/mathpix-markdown-it@1.0.40/es5/bundle.js";
document.head.append(script);

script.onload = function () {
    const isLoaded = window.loadMathJax();
    if (isLoaded) {
        console.log('Styles loaded!')
    }
}

function hideDetails() {
    var detailsElements = document.querySelectorAll("details");
    detailsElements.forEach(function (element) {
        element.style.display = "none";
    });
}

var mdown = "";
var codigo = "";
var textarea = document.getElementById('input');
function convert() {
    mdown = document.getElementById("input").value;
    const input = document.getElementById("input").value.trim();
    const output = document.getElementById('output');
    const options = { htmlTags: true };
    const html = window.markdownToHTML(input, options);
    codigo = html;
    output.innerHTML = html;
    //hideDetails();
    // FileMaker.PerformScript("_101 SaveMD Static", mdown);
    //  FileMaker.PerformScript("_101 SaveHTML Static", codigo);


}

function setFMMD(md) {
    input.innerHTML = md;
    convert()
}

document.addEventListener("DOMContentLoaded", function() {
  // Función para buscar y procesar el contenido del acordeón
  function procesarAcordeones() {
    // Selecciona todos los cuerpos de los acordeones
    var accordionBodies = document.querySelectorAll('.accordion-body');

    accordionBodies.forEach(function(body) {
      // Obtén el HTML del cuerpo del acordeón
      var htmlContent = body.innerHTML;

      // Verifica si el contenido incluye "Acordeon():"
      if (htmlContent.includes("Acordeon():")) {
        // Aquí implementas la lógica que necesitas ejecutar
        // Por ejemplo, modificar el HTML del acordeón
        // Puedes reemplazar "Acordeon():" por otro contenido o realizar otra acción
        var newHtmlContent = htmlContent.replace("Acordeon():", "<b>Contenido de Acordeón procesado</b>");
        body.innerHTML = newHtmlContent;

        // Aquí puedes agregar más lógica según necesites
        console.log("Acordeon() encontrado y procesado");
      }
    });
  }

  // Ejecuta la función al cargar la página
  procesarAcordeones();

  // Opcional: si tu contenido del acordeón puede cambiar dinámicamente o quieres
  // asegurarte de que se procese al abrir/cerrar, puedes llamar a `procesarAcordeones`
  // dentro de un event listener de 'click' en los botones del acordeón.
});

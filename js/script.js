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
var input = "";

function convert() {
    mdown = document.getElementById("input").value;
    input = document.getElementById("input").value.trim();
    const output = document.getElementById('output');

    // Limpia el contenedor global antes de comenzar a agregar contenido nuevo
    container.innerHTML = '';

    const blocks = extractBlocks(input);
    selectFunction(blocks);

    // Ahora 'container' tiene el contenido HTML generado solo por las funciones específicas
    // No necesitas agregar todo el Markdown procesado, solo el contenido relevante
    output.innerHTML = container.innerHTML;
}


function extractBlocks(text) {
    // Split the input text by the delimiter line
    const blocks = text.split('----').map(block => block.trim()).filter(block => block);
  
    // Initialize an array to hold the resulting objects
    const result = [];
  
    // Iterate over each block to extract the name and content
    blocks.forEach(block => {
      // Split the block into its name and content parts
      const [firstLine, ...contentLines] = block.split('\n');
      const nameMatch = firstLine.match(/^(.+?)\(\):/);

      if (nameMatch) {
        // Extract block name
        const nombre = nameMatch[1].trim();
  
        // Join the content lines into a single string
        const contenido = contentLines.join('\n').trim();
  
        // Add the object to the result array
        result.push({ nombre, contenido });
      }
    });

    return result;
  }

function setFMMD(md) {
    input.innerHTML = md;
    convert()
}

let script = document.createElement("script");
script.src =
  "https://cdn.jsdelivr.net/npm/mathpix-markdown-it@1.0.40/es5/bundle.js";
document.head.append(script);

script.onload = function () {
  const isLoaded = window.loadMathJax();
  if (isLoaded) {
    console.log("Styles loaded!");
  }
};

function hideDetails() {
  var detailsElements = document.querySelectorAll("details");
  detailsElements.forEach(function (element) {
    element.style.display = "none";
  });
}

var mdown = "";
var codigo = "";
var textarea = document.getElementById("input");
function convert() {
  mdown = document.getElementById("input").value;
  const input = document.getElementById("input").value.trim();
  const output = document.getElementById("output");
  const options = { htmlTags: true };
  let html = ""; // Inicializa la variable HTML

  // Divide el input en secciones basadas en "Acordeon():"
  var sections = input.split(/(?=Acordeon\(\):)/g);

  sections.forEach(function (section) {
    if (section.startsWith("Acordeon():")) {
      // Procesa cada sección de acordeón
      var accordionHtml = '<div class="accordion" id="accordionExample">';
      var items = section
        .replace("Acordeon():", "")
        .trim()
        .split("::")
        .slice(1);

      items.forEach(function (item, index) {
        var title = item.split("\n")[0];
        var content = item.split("\n").slice(1).join("\n");
        var contentHtml = window.markdownToHTML(content, options);
        accordionHtml += `
<div class="accordion-item">
    <h2 class="accordion-header" id="heading${index}">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
        ${title}
      </button>
    </h2>
    <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
      <div class="accordion-body">${contentHtml}</div>
    </div>
</div>`;
      });

      accordionHtml += "</div>";
      html += accordionHtml;
    } else {
      // Convierte el markdown a HTML para secciones no acordeón
      html += window.markdownToHTML(section, options);
    }
  });

  codigo = html;
  output.innerHTML = html;
}

function setFMMD(md) {
  input.innerHTML = md;
  convert();
}

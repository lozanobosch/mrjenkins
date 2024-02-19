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

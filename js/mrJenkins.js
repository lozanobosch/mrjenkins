var container = "";
let id = 0;

function selectFunction(text) {

    const functions = {
        'Navbar': navbar,
        'Acordeon': acordeon,
        'Toggle': toggle,
        'DefaultAlert': createDefaultAlert
    };
    container = document.createElement('div');

    text.forEach(child => {
        Object.keys(functions).forEach(functionName => {
            if (child.nombre === functionName) {
                container.innerHTML += functions[functionName](child.contenido);
            }
        });
    });
}

function acordeon(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Acordeon():\n" + text, '');
    input = input.replace("----", '');

    // Inicializar el código del acordeón
    let acordeonHTML = '';

    // Agregar contenedor principal del acordeón
    acordeonHTML += `
        <div class="container" style="margin-top: 60px;">
            <div class="row justify-content-center">
                <div class="col max-width-960">
                    <div class="accordion accordion-flush" id="accordionFlushExample">
    `;


    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (block.includes('::')) {
            // Si encontramos "::", guardamos la línea actual como atributo1
            encabezado = block.replace('::', '').trim();

            // Si hay una línea siguiente, la guardamos como atributo2
            if (i + 1 < blocks.length) {
                // Reemplazar texto entre dobles asteriscos con <b></b>
                contenido = formatText(blocks[i + 1]);
            }

            // Generar el código HTML del bloque de acordeón
            acordeonHTML += `
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-heading${id}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse${id}" aria-expanded="false" aria-controls="flush-collapse${i}">
                            ${encabezado}
                        </button>
                    </h2>
                    <div id="flush-collapse${id}" class="accordion-collapse collapse" aria-labelledby="flush-heading${id}" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">${contenido}</div>
                    </div>
                </div>
            `;
        }
    }

    acordeonHTML += `
                    </div>
                </div>
            </div>
        </div>
    `;

    return acordeonHTML;
}

function navbar(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Navbar():\n" + text, '');
    input = input.replace("----", '');

    let navbarHTML = '';
    let navbarDiv = '';
    var ul = false;

    // Agregar contenedor principal del acordeón
    navbarHTML += `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
    `;

    navbarDiv += `
        <div class="collapse navbar-collapse show justify-content-end" id="navbarNav">
            <ul class="navbar-nav"> 
    `;

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/!\[.*\]\(.*\)/.test(block)) {
            let matches = block.match(/\[(.*?)\]\((.*?)\)/);

            let textoAlternativo = matches[1];
            let urlImagen = matches[2];

            // Generar el código HTML del bloque de acordeón
            navbarHTML += `
                <a class="navbar-brand" href="#">
                    <img src="${urlImagen}" alt="${textoAlternativo}" style="width: 60px; height: auto;">
                </a>
            `;
        }
        else if (/\[(.*?)\]\((.*?)\)/.test(block)) {
            let matches = block.match(/\[(.*?)\]\((.*?)\)/);

            let texto = matches[1];
            let url = matches[2];
            ul = true;
            console.log(url);
            console.log(url);

            // Generar el código HTML del bloque de acordeón
            navbarDiv += `
                <li class="nav-item">
                    <a class="nav-link" href="${url}" id="miEnlace${id}">${texto}</a>
                </li>
            `;
        }
    }

    if (ul) {
        navbarHTML += navbarDiv + `
                </ul>
            </nav>
        `;
    }

    navbarHTML += `
        </nav>
    `;

    return navbarHTML;
}


function toggle(text) {
    let toggleHTML = '';

    // Divide el texto en bloques para crear múltiples toggles si es necesario
    const blocks = text.split('\n').filter(block => block !== '');

    blocks.forEach(block => {
        // Incrementa el ID para asegurar elementos únicos
        id++;

        // Extrae el título del bloque y procesa el markdown en el título
        const titleMarkdown = block.trim();
        const titleHTML = window.markdownToHTML ? window.markdownToHTML(titleMarkdown) : titleMarkdown;

        // Genera el HTML para el interruptor toggle de Bootstrap
        toggleHTML += `
            <div class="toggle-item form-check form-switch" style="margin-top: 20px;">
                <input class="form-check-input" type="checkbox" id="toggle-${id}">
                <label class="form-check-label" for="toggle-${id}">${titleHTML}</label>
            </div>
        `;
    });

    return toggleHTML;
}

function createDefaultAlert(markdown) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-primary';
    alertElement.setAttribute('role', 'alert');
    
    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(markdown);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}


function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/==(.*?)==/g, '<mark>$1</mark>')
        .replace(/_(.*?)_/g, '<i>$1</i>')
        .trim();
        
}
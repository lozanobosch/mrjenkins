var container = "";
let id = 0;

function selectFunction(text) {

    const functions = {
        'Navbar': navbar,
        'Acordeon': acordeon,
        'Toggle': toggle,
        'ActionSheetDefault': actionSheetDefault,
        'AdBox300_50': adBox300_50,
        'AdBox300_250': adBox300_250,
        'PrimaryAlert': primaryAlert,
        'SecondaryAlert': secondaryAlert,
        'SuccesAlert': successAlert,
        'DangerAlert': dangerAlert,
        'WarningAlert': warningAlert,
        'InfoAlert': infoAlert,
        'LightAlert': lightAlert,
        'DarkAlert': darkAlert,
        'BottomMenu': bottomMenu
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

/*Acordeon*/
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
/**/

/*Navbar*/
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
/**/

/*Toggle*/
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
/**/

/*Default ActionSheet*/
function actionSheetDefault(text) {
    // Crea el contenedor de la hoja de acción por defecto
    const actionSheetContainer = document.createElement('div');
    actionSheetContainer.className = 'section full mt-2';

    // Crea el título de la sección
    const sectionTitle = document.createElement('div');

    // Crea el bloque principal que contendrá el texto
    const wideBlock = document.createElement('div');
    wideBlock.className = 'wide-block pt-2 pb-2';

    // Convierte el Markdown a HTML y lo agrega al bloque principal
    const htmlContent = markdownToHTML(text); // Asume que existe una función que convierte Markdown a HTML
    wideBlock.innerHTML = htmlContent;

    // Añade los botones que activarán la hoja de acción
    const buttonContainer = document.createElement('p');
    buttonContainer.innerHTML = `
        <button type="button" class="btn btn-secondary" data-bs-toggle="offcanvas" data-bs-target="#actionSheetDefault">${htmlContent}</button>
        <div class="offcanvas offcanvas-bottom action-sheet" tabindex="-1" id="actionSheetDefault">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title">Action Sheet</h5>
            </div>
            <div class="offcanvas-body">
                <ul class="action-button-list">
                    <li>
                        <a href="#" class="btn btn-list text-primary" data-bs-dismiss="offcanvas">
                            <span>Open</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
                            <span>Delete</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
                            <span>Copy</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="btn btn-list" data-bs-dismiss="offcanvas">
                            <span>Share</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="btn btn-list text-danger" data-bs-dismiss="offcanvas">
                            <span>Close</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    `;

    // Agrega el título y los bloques al contenedor de la hoja de acción
    actionSheetContainer.appendChild(sectionTitle);
    actionSheetContainer.appendChild(wideBlock);
    actionSheetContainer.appendChild(buttonContainer);

    // Retorna el HTML de la hoja de acción
    return actionSheetContainer.outerHTML;
}
/**/

/*AdBox300*50*/
function adBox300_50(markdownText) {
    const blocks = markdownText.split('\n').filter(block => block !== '');
    let adBoxHTML = '';

    blocks.forEach(block => {
        if (/\((.*?)\)/.test(block)) {
            const matches = block.match(/\((.*?)\)/);
            const adImgSrc = matches[1];

            // Crear los elementos del DOM para el anuncio
            adBoxHTML += `
            <div class="section inset mt-2">
            <div class="wide-block pt-2 pb-2">
                <div class="adbox adbox-300-50">
                    <img src="${adImgSrc}" alt="Imagen">
                </div>

            </div>
        </div>
            `;
        }
    });

    return adBoxHTML;
}
/**/

/*AdBox300*250*/
function adBox300_250(markdownText) {
    const blocks = markdownText.split('\n').filter(block => block !== '');
    let adBoxHTML = '';

    blocks.forEach(block => {
        if (/\((.*?)\)/.test(block)) {
            const matches = block.match(/\((.*?)\)/);
            const adImgSrc = matches[1];

            // Crear los elementos del DOM para el anuncio
            adBoxHTML += `
            <div class="section inset mt-2">
            <div class="wide-block pt-2 pb-2">
                <div class="adbox adbox-300-250">
                    <img src="${adImgSrc}" alt="Imagen">
                </div>

            </div>
        </div>
            `;
        }
    });

    return adBoxHTML;
}
/**/

/*ALerts*/
function primaryAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-primary';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function secondaryAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-secondary';
    alertElement.setAttribute('role', 'alert2');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function successAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-success';
    alertElement.setAttribute('role', 'alert3');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function dangerAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-danger';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function warningAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-warning';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function infoAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-info';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function lightAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-light';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}

function darkAlert(text) {
    // Crea el elemento de la alerta
    const alertElement = document.createElement('div');
    alertElement.className = 'alert alert-dark';
    alertElement.setAttribute('role', 'alert');

    // Convierte Markdown a HTML (usando una función hipotética markdownToHTML)
    const htmlContent = markdownToHTML(text);
    alertElement.innerHTML = htmlContent; // Asigna el HTML convertido como contenido

    return alertElement.outerHTML;
}
/**/

/*ButtonMenu*/
function bottomMenu(text) {
    const lines = text.trim().split('\n');
    const items = lines.map(line => {
        const parts = line.split(',').map(part => part.trim());
        return { text: parts[0], href: parts[1], icon: parts[2] };
    });

    let menuHTML = `<div class="section full mt-2"><div class="appBottomMenu">`;

    items.forEach(item => {
        menuHTML += `
            <a href="${item.href}" class="item">
                <div class="col">
                    <ion-icon name="${item.icon}"></ion-icon>
                    <strong>${item.text}</strong>
                </div>
            </a>
        `;
    });

    menuHTML += `</div></div>`;
    return menuHTML;
}
/**/

/*Format text*/
function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/==(.*?)==/g, '<mark>$1</mark>')
        .replace(/_(.*?)_/g, '<i>$1</i>')
        .trim();

}
/**/
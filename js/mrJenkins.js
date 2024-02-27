var container = "";
let id = 0;

function selectFunction(text) {

    const functions = {
        'Divider': divider,
        'Navbar': navbar,
        'Acordeon': acordeon,
        'Paginacion': paginacion // Añadido aquí

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

            texto = formatText(texto);

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

function paginacion(text) {
    // Asegurarse de que text contiene un número válido y usar 5 como valor predeterminado
    let totalPaginas = parseInt(text);
    if (isNaN(totalPaginas) || totalPaginas <= 0) {
        totalPaginas = 5;
    }

    let paginacionHTML = '<nav aria-label="Page navigation example"><ul class="pagination">';
    paginacionHTML += '<li class="page-item"><a class="page-link" href="#" tabindex="-1">Anterior</a></li>';

    for (let i = 1; i <= totalPaginas; i++) {
        paginacionHTML += `<li class="page-item ${i === 1 ? 'active' : ''}"><a class="page-link" href="#">${i}</a></li>`;
    }

    paginacionHTML += '<li class="page-item"><a class="page-link" href="#">Siguiente</a></li>';
    paginacionHTML += '</ul></nav>';

    return paginacionHTML;
}



function divider(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Divider():\n" + text, '');
    input = input.replace("----", '');

    let dividerHTML = '';

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/--(\w+)(?:\/(\w+))?/.test(block)) {
            let matches = block.match(/--(\w+)(?:\/(\w+))?/);
            let color = matches[1];
            let icon = matches[2] || null;
            
            if (icon !== null) {
                dividerHTML += `
                    <div class="divider bg-${color} mt-5 mb-5">
                        <div class="icon-box bg-${color}">
                            <ion-icon name="${icon}"></ion-icon>
                        </div>
                    </div>
                `;
            } else {
                dividerHTML += `
                    <div class="divider bg-${color} mt-2 mb-3"></div>
                `;
            }
        }
       
    }

    return dividerHTML;
}

function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/==(.*?)==/g, '<mark>$1</mark>')
        .replace(/_(.*?)_/g, '<i>$1</i>')
        .trim();
}
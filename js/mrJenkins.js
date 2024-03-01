var container = "";
let id = 0;

function selectFunction(text) {

    const functions = {
        'Divider': divider,
        'Dropdown': dropdown,
        'Navbar': navbar,
        'Acordeon': acordeon,
        'FabButton': fabButton,
        'Form': formGenerator
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

function divider(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Divider():\n" + text, '');
    input = input.replace("----", '');

    let dividerHTML = '';

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/--(\w+)(?:\/(\w+))?/.test(block)) {
            let matches = block.match(/--(\w+)(?:\/([\w-]+))?/);
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

function dropdown(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Dropdown():\n" + text, '');
    input = input.replace("----", '');

    let dropdownHTML = '';

    dropdownHTML += `
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown"></button>
            <div class="dropdown-menu">
    `;

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/^::/.test(block)) {
            let buttonName = block.replace(/^::/, '');
            dropdownHTML = dropdownHTML.replace(/<button[^>]*>(.*?)<\/button>/, `<button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">${buttonName}</button>`);

        } else if (/\[(.*?)\]\((.*?)\)/.test(block)) {
            let matches = block.match(/\[(.*?)\]\((.*?)\)/);
            let texto = matches[1];
            let url = matches[2];

            texto = formatText(texto);

            dropdownHTML += `
                <a class="dropdown-item" href="${url}">${texto}</a>
            `;

        } else if (/>/.test(block)) {
            dropdownHTML += `
                <div class="dropdown-divider"></div>
            `;

        } else if (/^#/.test(block)) {
            let headerName = block.replace(/^#/, '');
            dropdownHTML += `
                <h6 class="dropdown-header">${headerName}</h6>
            `;

        }

    }

    return dropdownHTML;
}

function fabButton(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("FabButton():\n" + text, '');
    input = input.replace("----", '');

    let fabButtonHTML = '';

    fabButtonHTML += `
        <div class="fab-button animate bottom-right dropdown">
            <a href="#" class="fab" data-bs-toggle="dropdown">
                <ion-icon name="add-outline"></ion-icon>
            </a>
            <div class="dropdown-menu">
    `;

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/^::(.+)/.test(block)) {
            let positionMatches = block.match(/^::(.+)/);
            let position = positionMatches[1].trim().toLowerCase();

            if (['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'].includes(position)) {
                fabButtonHTML = fabButtonHTML.replace('bottom-right', position);
            }
            
        }

        if (/^\[([^\]]+)\/([^\]]+)\]\(([^)]+)\)/.test(block)) {
            let matches = block.match(/^\[([^\]]+)\/([^\]]+)\]\(([^)]+)\)/);
            let buttonText = matches[1];
            let buttonIcon = matches[2];
            let buttonLink = matches[3];

            fabButtonHTML += `
                <a class="dropdown-item" href="${buttonLink}">
                    <ion-icon name="${buttonIcon}"></ion-icon>
                    <p>${buttonText}</p>
                </a>
            `;
        }
    }

    fabButtonHTML += `
            </div>
        </div>
    `;

    return fabButtonHTML;
}

function formGenerator(text) {
    blocks = text.split('\n').filter(block => block !== '');
    input = input.replace("Form():\n" + text, '');
    input = input.replace("----", '');

    let formHTML = '';

    formHTML += `
        <div class="section full mt-2 mb-2">
            <div class="section-title">Form Example</div>
            <div class="wide-block pt-2 pb-3">

                <form class="needs-validation" novalidate>
    `;

    for (let i = 0; i < blocks.length; i++, id++) {
        const block = blocks[i];

        if (/^::/.test(block)) {
            let labelName = block.replace(/^::/, '');
            formHTML += `
                <div class="form-group basic">
                    <div class="input-wrapper">
                        <label class="label" for="input${id}">${labelName}</label>
                        <input type="text" class="form-control" id="input${id}" placeholder="Enter your ${labelName.toLowerCase()}" required>
                    </div>
                </div>
            `;

        } else if (/\[(.*?)\]\((.*?)\)/.test(block)) {
            let matches = block.match(/\[(.*?)\]\((.*?)\)/);
            let buttonText = matches[1];
            let buttonUrl = matches[2];

            buttonText = formatText(buttonText);

            formHTML += `
                <button class="btn btn-primary btn-block" type="submit" formaction="${buttonUrl}">${buttonText}</button>
            `;

        }
    }

    formHTML += `
                </form>
            </div>
        </div>
    `;

    return formHTML;
}

function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
        .replace(/==(.*?)==/g, '<mark>$1</mark>')
        .replace(/_(.*?)_/g, '<i>$1</i>')
        .trim();
}
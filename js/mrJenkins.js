var container = "";
let id = 0;

function selectFunction(blocks) {
    const functions = {
        'Divider': divider,
        'Navbar': navbar,
        'Acordeon': acordeon,
        'Paginacion': paginacion
    };

    container = document.createElement('div');

    blocks.forEach(block => {
        let parts = block.contenido.split(',');
        let pageNumber = parts[0];
        let style = parts[1]; // Aquí esperas 'secondary', 'rounded', 'square', etc.
        
        let styles = {};

        // Aplicar las clases correspondientes según el estilo
        if (style === 'secondary') {
            styles.ulClass = 'pagination pagination-secondary';
        } else if (style === 'rounded') {
            styles.ulClass = 'pagination pagination-rounded';
        } else if (style === 'square') {
            styles.ulClass = 'pagination pagination-square';
        } else if (style && style.startsWith('bg-')) {
            // Aquí asumimos que todos los botones deben tener el mismo color
            styles.aClass = `page-link ${style}`;
        }

        // Llama a la función de paginación con los estilos
        if (block.nombre === 'Paginacion') {
            container.innerHTML += paginacion(pageNumber, styles);
        } else if (functions[block.nombre]) {
            container.innerHTML += functions[block.nombre](block.contenido);
        }

        // Limpiar el input
        input = input.replace(`${block.nombre}():\n${block.contenido}`, '').trim();
    });

    return container.innerHTML;
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

function paginacion(pageNumber, styles = {}) {
    let totalPages = parseInt(pageNumber);
    if (isNaN(totalPages) || totalPages <= 0) {
        totalPages = 5; // default value if text is not a number
    }

    // Default and passed style classes
    let finalStyles = {
        ulClass: styles.ulClass || 'pagination',
        liClass: styles.liClass || 'page-item',
        aClass: styles.aClass || 'page-link',
        activeClass: styles.activeClass || 'active',
        colorClasses: styles.colorClasses || [] // color styles will be applied here
    };

    let paginationHTML = `<nav aria-label="Page navigation"><ul class="${finalStyles.ulClass}">`;

    // Previous button
    paginationHTML += `<li class="${finalStyles.liClass}"><a class="${finalStyles.aClass}" href="#" tabindex="-1">Previous</a></li>`;

    // Page number buttons
    for (let i = 1; i <= totalPages; i++) {
        let aClass = finalStyles.aClass;
        // Apply specific color class if it's defined for this index
        if (finalStyles.colorClasses[i - 1]) {
            aClass += ` ${finalStyles.colorClasses[i - 1]}`;
        }
        let activeClass = i === 1 ? finalStyles.activeClass : '';
        paginationHTML += `<li class="${finalStyles.liClass} ${activeClass}"><a class="${aClass}" href="#">${i}</a></li>`;
    }

    // Next button
    paginationHTML += `<li class="${finalStyles.liClass}"><a class="${finalStyles.aClass}" href="#">Next</a></li>`;

    paginationHTML += '</ul></nav>';

    return paginationHTML;
}



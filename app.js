document.addEventListener('DOMContentLoaded', cargarDatos);

function cargarDatos() {
    fetch('datos.json')
        .then(response => response.json())
        .then(datos => {
            datos.forEach(dato => {
                agregarHabilidadAlListado(dato.foto,dato.nombre, dato.habilidad, dato.contacto);
            });
        });
}

function agregarHabilidad(event) {
    event.preventDefault();

    const foto=document.getElementById('foto').value;
    const nombre = document.getElementById('nombre').value;
    const habilidad = document.getElementById('habilidad').value;
    const contacto = document.getElementById('contacto').value;

    agregarHabilidadAlListado(foto, nombre, habilidad, contacto);

    document.getElementById('foto').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('habilidad').value = '';
    document.getElementById('contacto').value = '';
}

function agregarHabilidadAlListado(foto, nombre, habilidad, contacto) {
    const tbody = document.getElementById('listado-habilidades').querySelector('tbody');
    const tr = document.createElement('tr');

    const tdFoto = document.createElement('td')
    const img =document.createElement('img')
    img.setAttribute('src', foto)
    img.setAttribute('height', '150px')
    tdFoto.appendChild(img);
    tr.appendChild(tdFoto)

    const tdNombre = document.createElement('td');
    tdNombre.textContent = nombre;
    tr.appendChild(tdNombre);

    const tdHabilidad = document.createElement('td');
    tdHabilidad.textContent = habilidad;
    tr.appendChild(tdHabilidad);

    const tdContacto = document.createElement('td');
    const aContacto = document.createElement('a');
    aContacto.href = contacto;
    aContacto.textContent = contacto;
    aContacto.target = '_blank';
    tdContacto.appendChild(aContacto);
    tr.appendChild(tdContacto);

    // const tdEditar = document.createElement('td');
    // const btnEditar = document.createElement('button');
    // btnEditar.textContent = 'Editar';
    // btnEditar.addEventListener('click', () => editarHabilidad(tr));
    // tdEditar.appendChild(btnEditar);
    // tr.appendChild(tdEditar);

    tbody.appendChild(tr);
}

function editarHabilidad(tr) {
    const tdFoto = tr.children[0]
    const tdNombre = tr.children[1];
    const tdHabilidad = tr.children[2];
    const tdContacto = tr.children[3];
    const tdEditar = tr.children[4];

    if (tdEditar.textContent === 'Editar') {
        tdFoto.contentEditable = 'true';
        tdNombre.contentEditable = 'true';
        tdHabilidad.contentEditable = 'true';
        tdContacto.contentEditable = 'true';
        tdEditar.textContent = 'Guardar';
    } else {
        tdFoto.contentEditable = 'false';
        tdNombre.contentEditable = 'false';
        tdHabilidad.contentEditable = 'false';
        tdContacto.contentEditable = 'false';
        tdEditar.textContent = 'Editar';
    }
}

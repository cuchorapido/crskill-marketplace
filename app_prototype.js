document.addEventListener('DOMContentLoaded', cargarDatos);

function cargarDatos() {
    fetch('datos_prototype.json')
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
    tdFoto.appendChild(img)
    tr.appendChild(tdFoto)
    // let logo = document.createElement("img");
    // logo.src = dato.contacto;

    // img.height = "64";
    // img.width = "64";
    tdFoto.appendChild(img);
    const tdNombre = document.createElement('td')
    tdNombre.textContent = nombre
    tr.appendChild(tdNombre)

    const tdHabilidad = document.createElement('td')
    tdHabilidad.textContent = habilidad
    tr.appendChild(tdHabilidad)

    const tdContacto = document.createElement('td')
    const aContacto = document.createElement('a');
    aContacto.href = contacto;
    aContacto.target = '_blank';
    const imgContacto = document.createElement('img')
    const contactoAnalizado = IdentificadorURL(contacto)
    imgContacto.setAttribute('src', contactoAnalizado )
    imgContacto.setAttribute('height', "100px")
    
    tdContacto.appendChild(aContacto)
    aContacto.appendChild(imgContacto)
    tr.appendChild(tdContacto)
    tbody.appendChild(tr)
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

function IdentificadorURL(contacto) {
    let imgSrc = "";
    
     switch (true) {
       case contacto.includes("instagram.com"):
         redSocial = "Instagram";
         imgSrc = "/imgs/Instagram-logo.webp";
         break;
       case contacto.includes("telegram.me") || contacto.includes("t.me"):
         redSocial = "Telegram";
         imgSrc = "/imgs/telegram-logo.webp";
         break;
       case contacto.includes("linkedin.com"):
         redSocial = "LinkedIn";
         imgSrc = "/imgs/linkedin-logo.webp";
         break;
       case contacto.includes("twitter.com"):
         redSocial = "Twitter";
         imgSrc = "/imgs/twitter-logo.webp";
         break;
       case contacto.includes("github.com"):
         redSocial = "GitHub";
         imgSrc = "/imgs/github-logo.webp";
         break;
       default:
         redSocial = "Otro";
         imgSrc = "/imgs/otros-logo.webp";
         break;
     }



    // const contactoAnalizado = logo
    return imgSrc

}
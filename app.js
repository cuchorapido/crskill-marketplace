document.addEventListener("DOMContentLoaded", onEventLoadCollaboratorHtml);
const $cards = document.getElementById("cards_collaborators");

function cargarDatos() {
  fetch("datos_prototype.json")
    .then((response) => response.json())
    .then((datos) => {
      datos.forEach((dato) => {
        agregarHabilidadAlListado(
          dato.foto,
          dato.nombre,
          dato.habilidad,
          dato.contacto
        );
      });
    });
}

async function getUsers() {
  const users = await fetch("datos.json");

  if (!users) return [];

  return await users.json();
}

function agregarHabilidad(event) {
  event.preventDefault();

  const foto = document.getElementById("foto").value;
  const nombre = document.getElementById("nombre").value;
  const habilidad = document.getElementById("habilidad").value;
  const contacto = document.getElementById("contacto").value;

  agregarHabilidadAlListado(foto, nombre, habilidad, contacto);

  document.getElementById("foto").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("habilidad").value = "";
  document.getElementById("contacto").value = "";
}

function agregarHabilidadAlListado(foto, nombre, habilidad, contacto) {
  const tbody = document
    .getElementById("listado-habilidades")
    .querySelector("tbody");
  const tr = document.createElement("tr");
  const tdFoto = document.createElement("td");
  const img = document.createElement("img");
  img.setAttribute("src", foto);
  img.setAttribute("height", "150px");
  tdFoto.appendChild(img);
  tr.appendChild(tdFoto);
  // let logo = document.createElement("img");
  // logo.src = dato.contacto;

  // img.height = "64";
  // img.width = "64";
  tdFoto.appendChild(img);
  const tdNombre = document.createElement("td");
  tdNombre.textContent = nombre;
  tr.appendChild(tdNombre);

  const tdHabilidad = document.createElement("td");
  tdHabilidad.textContent = habilidad;
  tr.appendChild(tdHabilidad);

  const tdContacto = document.createElement("td");
  const aContacto = document.createElement("a");
  aContacto.href = contacto;
  aContacto.target = "_blank";
  const imgContacto = document.createElement("img");
  const contactoAnalizado = IdentificadorURL(contacto);
  imgContacto.setAttribute("src", contactoAnalizado);
  imgContacto.setAttribute("height", "100px");

  tdContacto.appendChild(aContacto);
  aContacto.appendChild(imgContacto);
  tr.appendChild(tdContacto);
  tbody.appendChild(tr);
}

function editarHabilidad(tr) {
  const tdFoto = tr.children[0];
  const tdNombre = tr.children[1];
  const tdHabilidad = tr.children[2];
  const tdContacto = tr.children[3];
  const tdEditar = tr.children[4];

  if (tdEditar.textContent === "Editar") {
    tdFoto.contentEditable = "true";
    tdNombre.contentEditable = "true";
    tdHabilidad.contentEditable = "true";
    tdContacto.contentEditable = "true";
    tdEditar.textContent = "Guardar";
  } else {
    tdFoto.contentEditable = "false";
    tdNombre.contentEditable = "false";
    tdHabilidad.contentEditable = "false";
    tdContacto.contentEditable = "false";
    tdEditar.textContent = "Editar";
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
  return imgSrc;
}

function iconInstagram(params) {
  return `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
        stroke-linecap="round" stroke-linejoin="round"
    >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
    `;
}

function iconLinkedin(params) {
  return `
         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
        </svg>
    `;
}

function iconTwitter(params) {
  return `
     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
    `;
}

function iconLink(params) {
  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="white" fill="none" stroke-linecap="round" stroke-linejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
   <path d="M8.7 10.7l6.6 -3.4"></path>
   <path d="M8.7 13.3l6.6 3.4"></path>
</svg> `;
}

const objetIcons = {
  instagram: iconInstagram,
  linkedin: iconLinkedin,
  twitter: iconTwitter,
  link: iconLink,
};

iconKeys = Object.keys(objetIcons);

async function onEventLoadCollaboratorHtml() {
  const users = await getUsers();
  let html = "";

  users.forEach((element) => (html += cardCollaborators(element)));

  if (html.length === 0) html = viewContentEmpty();
    
  $cards.innerHTML = html;
}

function cardCollaborators({ nombre, habilidad, contacto }) {
  let icon = iconKeys.find((key) => contacto.includes(key.toLowerCase()));
  if (!icon) icon = "link";
  const iconSvg = objetIcons[icon]();

  return `
    <div class="card"> 
        <div class='content'>
        <h2>${nombre}</h2>
        <p>
            ${habilidad}
        </p>
        <ul class="social-icons">
            <li>
            <a href="${contacto}" title="${icon}"  rel="noopener noreferrer" target="_blank">
                ${iconSvg}
            </a>
            </li>  
        </ul>
        </div>
    </div> 
  `;
}

async function filterUsers() {
  const search = document.getElementById("searh_input").value;

  const users = await getUsers();
  let html = "";
  const $cards = document.getElementById("cards_collaborators");
  users.forEach((element) =>
    element.nombre.toLowerCase().includes(search) ||
    element.habilidad.toLowerCase().includes(search)
      ? (html += cardCollaborators(element))
      : null
  );

  if (html.length === 0) html = viewContentEmpty();
    

  $cards.innerHTML = html;
}

function viewContentEmpty() {
  return `
    <div class="view-empty">
      <p>Ups!, No se encontro colaboradores</p>
    </div> 
  `;
}

document.getElementById("searh_input").addEventListener("search", (event) => {
  event.value = "";
  onEventLoadCollaboratorHtml();
});

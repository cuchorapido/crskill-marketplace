document.addEventListener('DOMContentLoaded', cargarDatos);
document.getElementById('postulacion-form').addEventListener('submit', agregarHabilidad);

function cargarDatos() {
	fetch('datos.json')
		.then((response) => response.json())
		.then((datos) => {
			datos.forEach((dato) => {
				agregarHabilidadAlListado(dato.nombre, dato.habilidad, dato.contacto);
			});
		});
}

function agregarHabilidad(event) {
	event.preventDefault();

	const nombre = document.getElementById('nombre').value;
	const habilidad = document.getElementById('habilidad').value;
	const contacto = document.getElementById('contacto').value;

	agregarHabilidadAlListado(nombre, habilidad, contacto);

	document.getElementById('nombre').value = '';
	document.getElementById('habilidad').value = '';
	document.getElementById('contacto').value = '';
}

function agregarHabilidadAlListado(nombre, habilidad, contacto) {

    const tbody = document.getElementById('listado-habilidades').querySelector('tbody');
    const tr = document.createElement('tr');

    const tdNombre = document.createElement('td');
    tdNombre.textContent = nombre;
    tr.appendChild(tdNombre);

    const tdHabilidad = document.createElement('td');
    tdHabilidad.textContent = habilidad;
    tr.appendChild(tdHabilidad);

    const tdContacto = document.createElement('td');
    const aContacto = document.createElement('a');
    aContacto.href = contacto;
    aContacto.textContent = 'Contacto';
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
	const tdNombre = tr.children[0];
	const tdHabilidad = tr.children[1];
	const tdContacto = tr.children[2];
	const tdEditar = tr.children[3];

	if (tdEditar.textContent === 'Editar') {
		tdNombre.contentEditable = 'true';
		tdHabilidad.contentEditable = 'true';
		tdContacto.contentEditable = 'true';
		tdEditar.textContent = 'Guardar';
	} else {
		tdNombre.contentEditable = 'false';
		tdHabilidad.contentEditable = 'false';
		tdContacto.contentEditable = 'false';
		tdEditar.textContent = 'Editar';
	}
}

async function ClickFilterButton() {
	const nombre = document.getElementById('nombres').value;
	const habilidad = document.getElementById('habilidad').value;

	const persons = await FilterInput(nombre, habilidad);

	if (persons.length > 0) clearTable();

	AddDataToTable(persons);
}

async function getDataToJson() {
	const dataPersons = await fetch('datos.json');
	const data = await dataPersons.json();
	return data;
}

async function FilterInput(nombre, habilidad) {
	const data = await getDataToJson();

	return data.filter((p) => {
		const hasNombre = nombre.length > 0 && p.nombre.toLowerCase().includes(nombre.toLowerCase());
		const hasHabilidad = habilidad.length > 0 && p.habilidad.toLowerCase().includes(habilidad.toLowerCase());

		return hasNombre || hasHabilidad;
	});
}

function ResetTableWithData() {
	ResetInputFilter();
	clearTable();
	cargarDatos();
}

function ResetInputFilter() {
	document.getElementById('input__filters').reset();
}

function clearTable() {
	const tbody = document.getElementById('listado-habilidades').getElementsByTagName('tbody')[0];
	tbody.innerHTML = '';
}

function AddDataToTable(arrayData) {
	arrayData.map((p) => agregarHabilidadAlListado(p.nombre, p.habilidad, p.contacto));
}

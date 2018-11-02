class Tarea{
	constructor(nombre){
		this.nombre = nombre;
		this.completo = false;
	}
	completar(){
		this.completo = !this.completo;
	}
}
const contenedor = document.getElementById('contenedor');
class ListaTareas{
	constructor(nombre){
		this,nombre = nombre;
		this.tareas = [];
	}
	agregarTarea(tarea){
		this.tareas.push(tarea);
		this.dibujar();
	}
	eliminarTarea(indice){
		this.tareas.splice(indice,1);
		this.dibujar();
	}
	dibujar(){
		let lista = this.tareas.map(tarea => `
			<li class="tarea ${tarea.completo? 'completo':''}">
				<input class="entra" type="checkbox" ${tarea.completo? 'checked':''}/>
				<span class="titulo">${tarea.nombre}</span>
				<a class="complete">X</a>
			</li>
		`);
		contenedor.innerHTML = lista.reduce((a,b) => a + b,'');
	}
}
const entrada = document.getElementById('entrada');
const boton = document.getElementById('agregar');
var nuevaTarea = new ListaTareas('Trabajo');
boton.addEventListener('click',() => {
	var tarea = new Tarea(entrada.value);
	nuevaTarea.agregarTarea(tarea);
	entrada.value = "";
});
function obtenerIndice(e){
	let listaActual = e.target.parentElement,
		todasListas = [...contenedor.querySelectorAll('li')];
		// console.log(listaActual);
		// console.log(todasListas);
	let encontrado = todasListas.indexOf(listaActual);
	return encontrado;
}

contenedor.addEventListener('click',(e) => {
	if(e.target.tagName == 'A'){
		nuevaTarea.eliminarTarea(obtenerIndice(e));
	}
});

contenedor.addEventListener('click',(e) => {
	if(e.target.tagName == 'INPUT'){
		nuevaTarea.tareas[obtenerIndice(e)].completar();
		console.table(nuevaTarea.tareas);
		e.target.parentElement.classList.toggle('completo');
	}
});
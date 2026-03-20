const inputTarea = document.getElementById("inputTarea");
const btnAgregar = document.getElementById("btnAgregar");
const listaTareas = document.getElementById("listaTareas");

let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

function renderTareas() {
    listaTareas.innerHTML = "";
    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.textContent = tarea.texto;
        if (tarea.completado) li.style.textDecoration = "line-through";

        li.onclick = () => toggleTarea(tarea.id);

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.onclick = (e) => {
            e.stopPropagation();
            eliminarTarea(tarea.id);
        };
        li.appendChild(btnEliminar);
        listaTareas.appendChild(li);
    });
}

function guardarTareas() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function agregarTarea() {
    const texto = inputTarea.value.trim();
    if (!texto) return;
    tareas.push({ id: Date.now(), texto, completado: false });
    guardarTareas();
    renderTareas();
    inputTarea.value = "";
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    renderTareas();
}

function toggleTarea(id) {
    tareas = tareas.map(t => t.id === id ? { ...t, completado: !t.completado } : t);
    guardarTareas();
    renderTareas();
}

btnAgregar.onclick = agregarTarea;
renderTareas();

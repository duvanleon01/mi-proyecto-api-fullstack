const API_URL = 'http://localhost:3000/api/todos';

const todoList = document.getElementById('todoList');
const newTodoInput = document.getElementById('newTodoInput');
const addTodoButton = document.getElementById('addTodoButton');
const loadingMessage = document.getElementById('loadingMessage');

// Obtener todas las tareas
async function fetchTodos() {
    try {
        loadingMessage.style.display = 'block';
        todoList.innerHTML = '';
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const todos = await response.json();
        renderTodos(todos);
    } catch (error) {
        console.error("Error al obtener las tareas:", error);
        todoList.innerHTML = '<li class="list-group-item text-danger">Error al cargar las tareas. Asegúrate de que el back-end esté corriendo.</li>';
    } finally {
        loadingMessage.style.display = 'none';
    }
}

// Añadir una nueva tarea
async function addTodo() {
    const text = newTodoInput.value.trim();
    if (!text) {
        alert('Por favor, escribe una tarea.');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        newTodoInput.value = '';
        fetchTodos();
    } catch (error) {
        console.error("Error al añadir la tarea:", error);
        alert('No se pudo añadir la tarea. Revisa la consola para más detalles.');
    }
}

// Actualizar el estado de una tarea
async function toggleTodoCompleted(id, currentCompletedStatus) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: !currentCompletedStatus })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        fetchTodos();
    } catch (error) {
        console.error("Error al actualizar la tarea:", error);
        alert('No se pudo actualizar la tarea. Revisa la consola para más detalles.');
    }
}

// Eliminar una tarea
async function deleteTodo(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
        return;
    }
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok && response.status !== 204) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchTodos();
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
            alert('No se pudo eliminar la tarea. Revisa la consola para más detalles.');
        }
    }


    // Funciones de Renderizado de UI

    function renderTodos(todos) {
        todoList.innerHTML = '';
        if (todos.length === 0) {
            todoList.innerHTML = '<li class="list-group-item text-center text-muted">No hay tareas aún. ¡Añade una!</li>';
            return;
        }

        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'list-group-item todo-item';
            li.dataset.id = todo.id;

            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <input type="checkbox" class="form-check-input me-2" ${todo.completed ? 'checked' : ''}>
                    <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
                </div>
                <button class="btn btn-danger btn-sm">Eliminar</button>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => toggleTodoCompleted(todo.id, todo.completed));

            const deleteBtn = li.querySelector('.btn-danger');
            deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

            const todoTextSpan = li.querySelector('.todo-text');
            todoTextSpan.addEventListener('click', () => toggleTodoCompleted(todo.id, todo.completed)); // Clic en el texto también alterna

            todoList.appendChild(li);
        });
    }

    addTodoButton.addEventListener('click', addTodo);
    newTodoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    document.addEventListener('DOMContentLoaded', fetchTodos);
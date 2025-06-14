const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita CORS
app.use(express.json());

// Simulación de una base de datos en memoria (para este ejemplo simple)
let todos = [
    { id: 1, text: 'Aprender Node.js', completed: false },
    { id: 2, text: 'Construir una API REST', completed: true },
    { id: 3, text: 'Desplegar la aplicación', completed: false }
];
let nextId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

// 1. Obtener todas las tareas
app.get('/api/todos', (req, res) => {
    console.log('GET /api/todos - Solicitud recibida');
    res.status(200).json(todos);
});

// 2. Obtener una tarea por ID
app.get('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        console.log(`GET /api/todos/${id} - Tarea encontrada`);
        res.status(200).json(todo);
    } else {
        console.log(`GET /api/todos/${id} - Tarea no encontrada`);
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// 3. Crear una nueva tarea
app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) {
        console.log('POST /api/todos - Error: Texto de tarea requerido');
        return res.status(400).json({ message: 'El texto de la tarea es requerido' });
    }
    const newTodo = { id: nextId++, text, completed: false };
    todos.push(newTodo);
    console.log('POST /api/todos - Nueva tarea creada:', newTodo);
    res.status(201).json(newTodo); // 201 Created
});

// 4. Actualizar una tarea
app.put('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { text, completed } = req.body;
    const todoIndex = todos.findIndex(t => t.id === id);

    if (todoIndex !== -1) {
        todos[todoIndex] = { ...todos[todoIndex], text: text || todos[todoIndex].text, completed: typeof completed === 'boolean' ? completed : todos[todoIndex].completed };
        console.log(`PUT /api/todos/${id} - Tarea actualizada:`, todos[todoIndex]);
        res.status(200).json(todos[todoIndex]);
    } else {
        console.log(`PUT /api/todos/${id} - Tarea no encontrada`);
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// 5. Eliminar una tarea
app.delete('/api/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(t => t.id !== id);

    if (todos.length < initialLength) {
        console.log(`DELETE /api/todos/${id} - Tarea eliminada`);
        res.status(204).send(); // 204 No Content para eliminación exitosa
    } else {
        console.log(`DELETE /api/todos/${id} - Tarea no encontrada`);
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor de API REST escuchando en http://localhost:${PORT}`);
    console.log('Endpoints disponibles:');
    console.log(`  GET /api/todos`);
    console.log(`  GET /api/todos/:id`);
    console.log(`  POST /api/todos (ej. body: {"text": "Nueva tarea"})`);
    console.log(`  PUT /api/todos/:id (ej. body: {"completed": true})`);
    console.log(`  DELETE /api/todos/:id`);
});
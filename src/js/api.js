const BASE_URL = 'https://61a0b5686c3b400017e699f6.mockapi.io/todo';

async function fetchTodos() {
    const response = await fetch(`${BASE_URL}`);
    const todos = await response.json();
    return todos;
}

async function createTodo(text) {
    const response = await fetch(`${BASE_URL}`,{
        method: 'POST',
        body: JSON.stringify({
            completed: false,
            date: new Date(),
            text,
        }),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    const todo = await response.json();
    return todo;
}

async function updateTodo(id, date, text, completed) {
    const response = await fetch(`${BASE_URL}/${id}`,{
        method: 'PUT',
        body: JSON.stringify({
            completed,
            date,
            id,
            text,
        }),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    });
    const editTodo = await response.json();
    return editTodo;
}

async function deleteTodo(id) {
    const response = await fetch(`${BASE_URL}/${id}`,{
        method: 'DELETE'
    });

    const deleteTodo = await response.json();
    return deleteTodo;
}

export {fetchTodos, updateTodo, deleteTodo, createTodo}


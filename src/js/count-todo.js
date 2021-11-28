const countTodo = (todos) => {
    const quantityAllTodos = todos.length;
    const quantityActiveTodos = todos.reduce((acc, item) => !item.completed ? acc += 1 : acc, 0);
    const quantityInActiveTodos = quantityAllTodos - quantityActiveTodos;
    const resultArray = [{name: 'Scope', amount: quantityAllTodos}, {name: 'Active', amount: quantityActiveTodos}, {name: 'Successful', amount: quantityInActiveTodos}]
    return resultArray;
}

export {countTodo}
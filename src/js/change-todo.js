import Notiflix from "notiflix";
import { updateTodo } from "./api";
import { handleTodos } from "./handle-todo";
import { HIGH_ERROR_MESSAGE } from "..";
import { loader } from "./loader";
import { addTodoButtonFoot, addTodoButtonHead } from "..";

const changeTodo = (item, parentItem, todos, list, newtext, amount) => {
    const textTodo = parentItem.querySelector('.todo__desc');
    const checkboxTodo = parentItem.querySelector('.todo__checkbox');
    const todoTick = parentItem.querySelector('.todo__icon--save');

    const currentId = parentItem.dataset.id;
    const saveId = newtext.id;
    const resultId = currentId || saveId;
    const selectTodo = todos.find(todo => todo.id === resultId);
    
    if(item.classList.contains('todo__icon--edit')) {
        textTodo.removeAttribute('readonly');
        textTodo.classList.remove('todo__desc--completed');
        item.classList.remove('todo__icon--edit');
        item.classList.add('todo__icon--save');
        checkboxTodo.removeAttribute('checked');
        
    } else if(resultId) {
        if(item.classList.contains('todo__tick') && !todoTick) {
            list.innerHTML = loader();
            addTodoButtonHead.classList.add('visually-hidden');
            addTodoButtonFoot.classList.add('visually-hidden');
            updateTodo(selectTodo.id, selectTodo.date, selectTodo.text, !selectTodo.completed).then(data => {
                localStorage.setItem('todo', JSON.stringify({id: '', value: ''}));
                handleTodos(todos, list, amount);
            }).catch(error => {
                list.removeChild(list.firstElementChild);
                Notiflix.Notify.failure(HIGH_ERROR_MESSAGE);
            });
     } else if(item.classList.contains('todo__icon--save') && newtext.value) {
            list.innerHTML = loader();
            addTodoButtonHead.classList.add('visually-hidden');
            addTodoButtonFoot.classList.add('visually-hidden');
            updateTodo(selectTodo.id, selectTodo.date, newtext.value ? newtext.value : selectTodo.text, false).then(data => {
                addTodoButtonHead.classList.add('visually-hidden');
                addTodoButtonFoot.classList.add('visually-hidden');
                localStorage.setItem('todo', JSON.stringify({id: '', value: ''}));
                handleTodos(todos, list, amount);
            }).catch(error => {
                list.removeChild(list.firstElementChild);
                Notiflix.Notify.failure(HIGH_ERROR_MESSAGE);
            });
     } 
    } 
}

export {changeTodo}
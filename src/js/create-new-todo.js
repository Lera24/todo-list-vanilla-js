import Notiflix from "notiflix";
import { createTodo } from './api';
import { handleTodos } from './handle-todo';
import { loader } from './loader';
import { addTodoButtonFoot, addTodoButtonHead } from '..';
import { HIGH_ERROR_MESSAGE } from "..";

const createNewTodo = (item, parentItem, todos, list, newText, amount) => {
    if(!parentItem.dataset.id && !newText.id && newText.value) {
        if(item.classList.contains('todo__icon--save')) {
            list.innerHTML = loader();
            addTodoButtonHead.classList.add('visually-hidden');
            addTodoButtonFoot.classList.add('visually-hidden');
            createTodo(newText.value).then(data => {
                handleTodos(todos, list, amount);
                localStorage.setItem('todo', JSON.stringify({id: '', value: ''}));
            }).catch(error => {
                Notiflix.Notify.failure(HIGH_ERROR_MESSAGE);
            })
        }
    }
}

export {createNewTodo}
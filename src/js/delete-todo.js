import Notiflix from "notiflix";
import { deleteTodo } from "./api";
import { handleTodos } from "./handle-todo";
import { HIGH_ERROR_MESSAGE } from "..";
import { loader } from "./loader";
import { INFO_MESSAGE } from "..";
import { addTodoButtonFoot, addTodoButtonHead } from "..";

const deleteSelectTodo = (item, parentItem, todos, list, amount) => {
    const currentId = parentItem.dataset.id;

    if(item.classList.contains('todo__icon--delete')) {
        if(currentId) {
            list.innerHTML = loader();
            addTodoButtonHead.classList.add('visually-hidden');
            addTodoButtonFoot.classList.add('visually-hidden');
            deleteTodo(currentId).then(data => handleTodos(todos, list, amount)).catch(error => {
                list.removeChild(list.firstElementChild);
                Notiflix.Notify.failure(HIGH_ERROR_MESSAGE);
            });
        } else {
            parentItem.parentNode.removeChild(parentItem.parentNode.firstElementChild);

            if(todos.length === 0) {
                list.insertAdjacentHTML('afterend', '<h3 class="message">Not found todo...</h3>');
                addTodoButtonHead.classList.remove('visually-hidden');
                addTodoButtonFoot.classList.remove('visually-hidden');
                Notiflix.Notify.info(INFO_MESSAGE);
                return;
            }
        }
    }
}

export {deleteSelectTodo}
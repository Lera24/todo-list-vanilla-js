import autosize from "autosize";
import { murkupTodo } from "./murkup-todo";
import { getCurrentDate } from "./get-date";

const addTemplateTodo = (list, text) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const newArrayTodos = [...list.children];
    const selectTodos = newArrayTodos.find(item => !item.dataset.id);
    const currentDate = getCurrentDate();
    const arrayTextaria = document.querySelectorAll('.todo__desc');

    if(selectTodos) {
        return;
    }

    if(list.nextElementSibling.classList.contains("message")) {
        const warnMessage = document.querySelector('.message')
        list.parentNode.removeChild(warnMessage);
    }

    const murkupNewTodo = murkupTodo('',text ? text : '', currentDate, false, '');
    list.insertAdjacentHTML("afterbegin", murkupNewTodo);
    autosize(arrayTextaria);

    const saveButton = list.firstElementChild.querySelector('.todo__icon');  
    saveButton.classList.remove('todo__icon--edit');
    saveButton.classList.add('todo__icon--save');
}

export {addTemplateTodo}
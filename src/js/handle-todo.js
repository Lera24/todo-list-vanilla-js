import Notiflix from "notiflix";
import murkupTodo from './murkup-todo';
import { fetchTodos } from "./api";
import {parseGetDate} from './get-date';
import {countTodo} from './count-todo';
import {updateResultTodo} from './update-head';
import { WARN_MESSAGE, INFO_MESSAGE, HIGH_ERROR_MESSAGE } from "..";
import { addTodoButtonFoot, addTodoButtonHead } from "..";

export const handleTodos = (todos, list, amount) => {
    const loader = list.parentNode.querySelector('.lds-roller');

    fetchTodos().then(data => {
        todos.length = 0;
        todos.push(...data);
        amount = countTodo(todos);
        updateResultTodo(amount);
        const sortTodos = [...data];
        sortTodos.sort((a, b) => ((new Date(b.date)).getTime() - (new Date(a.date)).getTime()));
        localStorage.setItem('todos', JSON.stringify(sortTodos));
        const murkupAllTodos = sortTodos.map(todo => murkupTodo(todo.id, todo.text, parseGetDate(todo.date), todo.completed, 'readonly')).join(' ');
        if(loader) {loader.remove()};
        list.innerHTML = murkupAllTodos;

        if(todos.length === 0) {
            list.insertAdjacentHTML('afterend', '<h3 class="message">Not found todo...</h3>');
            addTodoButtonHead.classList.remove('visually-hidden');
            addTodoButtonFoot.classList.remove('visually-hidden');
            Notiflix.Notify.info(INFO_MESSAGE);
            return;
        }

        if(list.nextElementSibling.classList.contains("message")) {
            const warnMessage = document.querySelector('.message')
            list.parentNode.removeChild(warnMessage);
        }

        if(addTodoButtonHead.classList.contains('visually-hidden') || addTodoButtonFoot.classList.contains('visually-hidden') ) {
            addTodoButtonHead.classList.remove('visually-hidden');
            addTodoButtonFoot.classList.remove('visually-hidden');
        }
        
        Notiflix.Notify.warning(WARN_MESSAGE);
    }).catch(error => {
        const sortArray = JSON.parse(localStorage.getItem('todos'));
        const murkupAllTodos = sortArray.map(todo => murkupTodo(todo.id, todo.text, parseGetDate(todo.date), todo.completed, 'readonly')).join(' ');
        list.innerHTML = murkupAllTodos;
        Notiflix.Notify.failure(HIGH_ERROR_MESSAGE);
    })
}
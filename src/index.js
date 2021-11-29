import autosize from 'autosize';
import { murkupTodo } from './js/murkup-todo';
import { changeTodo } from './js/change-todo';
import { deleteSelectTodo } from './js/delete-todo';
import { createNewTodo } from './js/create-new-todo';
import { addTemplateTodo } from './js/add-template-todo';
import { handleTodos } from './js/handle-todo';
import { parseGetDate } from './js/get-date';
import { countTodo } from './js/count-todo';
import { updateResultTodo } from './js/update-head';

export const addTodoButtonHead= document.querySelector(".main__button");
export const addTodoButtonFoot = document.querySelector(".foot__button");
const listTodos = document.querySelector('.todo__list');

export const INFO_MESSAGE = 'Please add your first todo';
export const HIGH_ERROR_MESSAGE = 'Have problems. Please, try again later';

let allTodos = [];
let summTodos = [];
let currentText = '';


const changeTodoText = JSON.parse(localStorage.getItem('todo'));
const saveTodos = JSON.parse(localStorage.getItem('todos'));

if(changeTodoText) {
    if(changeTodoText.value) {
      addTemplateTodo(listTodos, changeTodoText.value);
      const arrayTextaria = document.querySelectorAll('.todo__desc');
      autosize(arrayTextaria);
    };

    const selectTodo = saveTodos.filter(item => item.id !== changeTodoText.id);
    const murkupSaveTodos = selectTodo.map(todo => murkupTodo(todo.id, todo.text, parseGetDate(todo.date), todo.completed, 'readonly')).join(' ');
    listTodos.insertAdjacentHTML("beforeend", murkupSaveTodos);
    const arrayTextaria = document.querySelectorAll('.todo__desc');
    autosize(arrayTextaria);
    
    if(saveTodos) {
      const calcAmountTodos = countTodo(saveTodos);
      updateResultTodo(calcAmountTodos);
    }

    if(!listTodos.children.length) {
      listTodos.insertAdjacentHTML('afterend', '<h3 class="message">Not found todo...</h3>');
    }

} else {
  addTodoButtonHead.classList.add('visually-hidden');
  addTodoButtonFoot.classList.add('visually-hidden');
  handleTodos(allTodos, listTodos, summTodos)
};

const mainCallBack = (e) => {
    e.preventDefault();
    const currentParentElem = e.target.parentNode.parentNode.parentNode;
    const currentElem = e.target;

    const changeTodoText = JSON.parse(localStorage.getItem('todo'));
    const saveTodos = JSON.parse(localStorage.getItem('todos'));

    if(changeTodoText) {
        createNewTodo(currentElem, currentParentElem, allTodos, listTodos, changeTodoText, summTodos);
        if(saveTodos) {
          changeTodo(currentElem, currentParentElem, saveTodos, listTodos, changeTodoText, summTodos);
          deleteSelectTodo(currentElem, currentParentElem, saveTodos, listTodos, summTodos);
        }
    } else {
      changeTodo(currentElem, currentParentElem, allTodos, listTodos, currentText, summTodos);
      createNewTodo(currentElem, currentParentElem, allTodos, listTodos, currentText, summTodos);
      deleteSelectTodo(currentElem, currentParentElem, allTodos, listTodos, summTodos);
    }
}

listTodos.addEventListener('click', mainCallBack);

const handleInputValue = (e) => {
  const currentElem = e.target;

  if(currentElem.classList.contains('todo__desc')) {
    const currentParentItem = currentElem.parentNode.parentNode.parentNode.parentNode;
    const idSelectElem = currentParentItem.dataset.id;

    localStorage.setItem('todo', JSON.stringify({id: idSelectElem ? idSelectElem : '', value: currentElem.value}));
    const arrayTextaria = document.querySelectorAll('.todo__desc');
    autosize(arrayTextaria);
  }
}

listTodos.addEventListener('input', handleInputValue);

const createTemplateTodo = () => {
    addTemplateTodo(listTodos);
}

addTodoButtonHead.addEventListener('click', createTemplateTodo);
addTodoButtonFoot.addEventListener('click', createTemplateTodo);

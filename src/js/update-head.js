import {murkupHeader} from './murkup-header';

const updateResultTodo = (result) => {
    const getMurkupHead = result.map(item => murkupHeader(item.amount, item.name)).join(' ');
    const list = document.querySelector('.head__list');
    list.innerHTML = getMurkupHead;
}

export {updateResultTodo}
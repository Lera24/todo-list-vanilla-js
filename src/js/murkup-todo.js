const murkupTodo = (id, text, date, state, access) => {
    return `<li class="todo__item" data-id="${id}" data-completed="${state}">
    <div class="todo__wrap">
        <label class="todo__label">
            <input type="checkbox" class="todo__checkbox visually-hidden" ${state ? 'checked="true"' : null}/>
            <span class="todo__tick"></span>
        </label>
        <div class="todo__wrap--desc">
            <span class="todo__date">${date}</span>
            <div>
                <textarea type="text" class="todo__desc ${state ? "todo__desc--completed" : ''}" ${access ? access : ''} rows="1">${text ? text : ''}</textarea>
            </div>
        </div>
    </div>
    <div class="button__wrap">
        <button class="todo__button todo__button--edit">
            <span class="todo__icon todo__icon--edit"></span>
        </button>
        <button class="todo__button todo__button--delete">
            <span class="todo__icon--delete"></span>
        </button>
    </div>
    </li>`
}

export default murkupTodo
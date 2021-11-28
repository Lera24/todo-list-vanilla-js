const murkupHeader = (amount, title) => {
    return `<li class="head__item">
    <h2 class="head__subtitle">${title}</h2>
    <span class="head__text">${amount}</span>
        </li>`
}

export {murkupHeader}
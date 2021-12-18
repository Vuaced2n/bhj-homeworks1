const dropDown = document.querySelector('.dropdown__value');
const dropDownList = document.querySelector('.dropdown__list');

dropDown.addEventListener('click', listState);
dropDownList.addEventListener('click', itemSelect);

/**
 * Открывает и закрывает список
 */
function listState() {
  dropDownList.classList.toggle('dropdown__list_active');
}

/**
 * Изменяет текст в dropDown
 * @param event
 */
function itemSelect(event) {
  event.preventDefault();
  dropDown.innerHTML = event.target.innerText;
  listState();
}

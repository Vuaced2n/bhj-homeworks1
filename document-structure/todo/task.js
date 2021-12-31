'use strict'

const taskInput = document.querySelector('#task__input');
const addButton = document.querySelector('#tasks__add');
const taskList = document.querySelector('#tasks__list');

addButton.addEventListener('click', validateInput);
taskList.addEventListener('click', removeTask);

checkSaveLocalstorage();


/**
 * Проверяет наличие сохраненных данных в localStorage
 */
function checkSaveLocalstorage() {
  const saveData = JSON.parse(localStorage.getItem('tasks'));
  if (saveData !== null && saveData.list.length > 0) {
    saveData.list.forEach(elem => {
      taskList.insertAdjacentHTML('beforeEnd', elem);
    });
  } else {
    localStorage.setItem('tasks', JSON.stringify({list: []}));
  }
}


/**
 * Валидация поля ввода
 */
function validateInput(event) {
  event.preventDefault();
  const inputValue = taskInput.value.trim();
  if (inputValue.length === 0) {
    console.error('Пустое поле!');
    alert('Пустое поле');
    return;
  }
  addTask(inputValue);
}


/**
 * Добавляет задачу в список
 * @param inputValue - валидированное значение поля input
 */
function addTask(inputValue) {

  let task = `<div class="task">
                <div class="task__title">
                  ${inputValue}
                </div>
                <a href="#" class="task__remove">&times</a>
              </div>`;

  taskList.insertAdjacentHTML('beforeEnd', task);
  taskInput.value = '';
  addLocalStorage(task);
}


/**
 * Удаление задачи из списка
 * @param event
 */
function removeTask(event) {

  if (!event.target.matches('.task__remove')) return;

  const removeItem = event.target.closest('div.task');
  //индекс удаляемого элемента
  const index = [...taskList.children].indexOf(removeItem);

  removeItem.remove();
  removeLocalStorage(index);
}

/**
 * Добавляет данные в localStorage
 * @param elem - добавляемый элемент
 */
function addLocalStorage(elem) {
  let storage = JSON.parse(localStorage.getItem('tasks'));
  storage.list.push(elem);
  localStorage.setItem('tasks', JSON.stringify(storage));
}

/**
 * Удаляет данные из localStorage
 * @param index - Индекс удаляемого элемента
 */
function removeLocalStorage(index) {
  let storage = JSON.parse(localStorage.getItem('tasks'));
  storage.list.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(storage));
}



'use strict'

const pollTitle = document.querySelector('#poll__title')
const pollAnswer = document.querySelector('#poll__answers')
const popup = document.querySelector('#popup')
const url = 'https://netology-slow-rest.herokuapp.com/poll.php'
let id = null;    // id ответа
let title = null;   // Текст вопроса
let answers = null;    // Массив ответов

popup.addEventListener('click', popupHandler)

getData()


/**
 * Отправляет запрос на получение вопроса и ответов
 */
function getData() {
  let xhr = new XMLHttpRequest()
  xhr.addEventListener('readystatechange', dataHandler)
  xhr.open('GET', url)
  xhr.responseType = 'json'
  xhr.send();
}


/**
 * Обрабатывает ответ и добавляет кнопки на страницу
 */
function dataHandler() {
  if (this.readyState === this.DONE && this.status === 200) {
    pollAnswer.addEventListener('click', answerHandler)
    id = this.response['id']
    title = this.response.data['title']
    answers = this.response.data['answers']

    let fragment = new DocumentFragment()
    answers.forEach(item => {
      fragment.append(createButton(item))
    })
    pollTitle.append(title)
    pollAnswer.append(fragment)
  }
}


/**
 * Создает элемент кнопки с ответом
 * @param text - текст ответа
 * @returns {HTMLButtonElement}
 */
function createButton(text) {
  let button = document.createElement('button')
  button.className = 'poll__answer'
  button.innerText = text
  return button
}


/**
 * Обработка кнопки с ответом
 * @param event
 */
function answerHandler(event) {
  if (event.target.tagName !== 'BUTTON') return
  popup.classList.remove('hide-popup')
  const answerIndex = answers.indexOf(event.target.textContent)
  statsRequest(answerIndex)
}


/**
 * Скрывает popup
 * @param event
 */
function popupHandler(event) {
  if (event.target.tagName !== 'BUTTON') return
  popup.classList.add('hide-popup')
}


/**
 * Отправка запроса на статистику ответов
 * @param answerIndex - Индекс выбранного ответа
 */
function statsRequest(answerIndex) {
  let xhrStats = new XMLHttpRequest()
  xhrStats.addEventListener('readystatechange', statsRequestHandler)
  xhrStats.open('POST', url)
  xhrStats.responseType = 'json'
  xhrStats.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  xhrStats.send(`vote=${id}&answer=${answerIndex}`)
}


/**
 * Обработка ответа стаитстики
 */
function statsRequestHandler() {
  if (this.readyState === this.DONE && this.status === 200) {
    const response = this.response['stat']
    let sum = response.reduce((sum, elem) => sum + elem['votes'], 0)
    let fragment = new DocumentFragment();
    response.forEach(elem => {
      const {answer, votes} = elem;
      const percent = +(votes * 100 / sum).toFixed(2)
      fragment.append(createStatisticsElement(answer, percent))
    })

    // Очищаем элемент
    pollAnswer.innerHTML = ''
    // Добавляем данные статистики
    pollAnswer.append(fragment)
    // Добавяем кнопку перезагрузки страницы
    pollAnswer.insertAdjacentHTML('beforeEnd', '<button onclick="resetPage()">C начала</button>')
  }
}


/**
 * Сохдает элемент статитики
 * @param answer - Текст ответа
 * @param percent - Процент
 * @returns {HTMLParagraphElement}
 */
function createStatisticsElement(answer, percent) {
  let element = document.createElement('p')
  element.innerHTML = `${answer}:&nbsp;<strong>${percent}&nbsp;%</strong>`
  return element
}


/**
 * Обновляет страницу
 */
function resetPage() {
  pollAnswer.removeEventListener('click', answerHandler)
  // location.reload()
  pollTitle.innerHTML = ''
  pollAnswer.innerHTML = ''
  getData()
}

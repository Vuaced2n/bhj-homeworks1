'use strict'

const form = document.querySelector('#form')
const progress = document.querySelector('#progress')
const url = 'https://netology-slow-rest.herokuapp.com/upload.php'

form.addEventListener('submit', submitFormHandler)


function submitFormHandler(event) {
  event.preventDefault()

  let xhr = new XMLHttpRequest()

  // Событие начала загрузки
  xhr.upload.onloadstart = function () {
    console.log('Начало загрузки')
  }

  // Событие окончания загрузки
  xhr.upload.onload = function () {
    console.log('Загрузка успешно завершена')
    setTimeout(() => {
      alert('Загрузка успешно завершена')
    }, 100)
  }

  // Событие прогресс загрузки
  xhr.upload.addEventListener('progress', (event) => {
    progress.value = event.loaded / event.total
  })

  // Событие ошибка загрузки
  xhr.upload.onerror = function () {
    console.error('Ошибка загрузки данных!')
    alert('Ошибка загрузки данных!')
  }

  xhr.open('POST', url)
  xhr.send(new FormData(form))
}

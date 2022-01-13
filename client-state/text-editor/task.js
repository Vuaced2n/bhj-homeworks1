'use strict'

const textAria = document.querySelector('#editor')
const clearButton = document.querySelector('#clearButton')

textAria.addEventListener('keyup', () => {
  addLocalstorage(textAria.value)
})
clearButton.addEventListener('click', clearLocalStorage)


checkLocalstorage()


/**
 * Проверяет сохраненные данные в localStorage
 */
function checkLocalstorage() {
  const data = localStorage.editor
  if (data) {
    textAria.value = data
  } else {
    localStorage.editor = ''
  }
}

/**
 * Добавляет данные в localStorage
 * @param value - - Значение поля textarea
 */
function addLocalstorage(value) {
  localStorage.editor = textAria.value
}


/**
 * Очищает localStorage
 */
function clearLocalStorage() {
  localStorage.editor = ''
  textAria.value = ''
}



// ИЛИ

// /**
//  * Проверяет сохраненные данные в localStorage
//  */
// function checkLocalstorage() {
//   const data = JSON.parse(localStorage.getItem('editor'))
//   if (data && data.length > 0) {
//     textAria.value = data[0]
//   } else {
//     localStorage.setItem('editor', '[]')
//   }
// }
//
//
// /**
//  * Добавляет данные в localStorage
//  * @param value - Значение поля textarea
//  */
// function addLocalstorage(value) {
//   let data = JSON.parse(localStorage.getItem('editor'))
//   data.splice(0, 1, value)
//   localStorage.setItem('editor', JSON.stringify(data))
// }
//
//
// /**
//  * Очищает localStorage
//  */
// function clearLocalStorage() {
//   localStorage.setItem('editor', '[]')
//   textAria.value = ''
// }

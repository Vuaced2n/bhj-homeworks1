'use strict'

const popup = document.querySelector('#subscribe-modal')
const buttonClosePopup = popup.querySelector('.modal__close')

buttonClosePopup.addEventListener('click', closePopup)

const checkCookie = getCookie('popup');

if (!checkCookie || checkCookie === 'false') {
  setCookie('popup', false)
  setTimeout(() => {
    popup.classList.add('modal_active')
  }, 2000)
}


/**
 * Закрытие модального окна
 */
function closePopup() {
  popup.classList.remove('modal_active')
  setCookie('popup', true)
}


/**
 * Получение значения cookie по ключу
 * @param key - ключ
 * @returns {string|null}
 */
function getCookie(key) {
  const data = document.cookie.split('; ')
  const cookie = data.find((elem) => elem.includes(key))
  if (cookie) {
    const value = cookie.split('=')[1]
    return decodeURIComponent(value)
  }
  return null
}


/**
 * Установка cookie
 * @param key - ключ
 * @param value - значение
 */
function setCookie(key, value) {
  document.cookie = key + '=' + encodeURIComponent(value)
}


//Удаление cookie
// document.cookie = `popup=; expires=${new Date(2020, 0, 1)}`


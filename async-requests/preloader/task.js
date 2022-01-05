'use strict'

const listCurrencies = document.querySelector('#items');
const loader = document.querySelector('#loader');
const requestUrl = 'https://netology-slow-rest.herokuapp.com';
let storage = [];

checkLocalStorage();

let xhr = new XMLHttpRequest();
xhr.addEventListener('readystatechange', requestHandler);
xhr.open('GET', requestUrl);
xhr.send();


function requestHandler() {
  if (xhr.readyState === xhr.DONE) {
    const response = JSON.parse(xhr.responseText);
    const CurrencyData = response['response']['Valute'];
    let fragment = new DocumentFragment();
    for (let key in CurrencyData) {
      const {'CharCode': charCode, 'Value': value} = CurrencyData[key];
      fragment.append(createElement(charCode, value));
      storage.push({[charCode]: value});
    }

    // Убираем загрузчик
    loader.classList.remove('loader_active');
    // Добавляем фрагмент со всеми валютами
    listCurrencies.append(fragment);
    // Добавляем в localStorage
    addCurrencyLocalStorage();
  }
}

/**
 * Создает новый элементвалюты
 * @param charCode - Код валюты
 * @param value - Значение вылюты
 * @returns {HTMLDivElement} - элеметн разметки
 */
function createElement(charCode, value) {
  let element = document.createElement('div');
  element.classList.add('item');
  element.innerHTML = `
                 <div class="item__code">${charCode}</div>
                 <div class="item__value">${value}</div>
                 <div class="item__currency">руб.</div>
                  `;
  return element;
}


/**
 * Добавляет в localStorage
 */
function addCurrencyLocalStorage() {
  // Удаляем старые данные из localStorage
  localStorage.setItem('currency', JSON.stringify({items: []}));

  let restoreData = JSON.parse(localStorage.getItem('currency'));
  restoreData.items = storage;
  localStorage.setItem('currency', JSON.stringify(restoreData));
}


/**
 * Проверка данных в localStorage
 */
function checkLocalStorage() {
  const data = window.localStorage.getItem('currency');
  if (data !== null && JSON.parse(data).items.length > 0) {
    console.log('Есть сохраненные данные');
    const storageData = JSON.parse(data).items;
    let fragment = new DocumentFragment();

    storageData.forEach(elem => {
      const charCode = Object.keys(elem)[0];
      const value = elem[charCode];
      fragment.append(createElement(charCode, value));
    });
    // Удаляем loader
    loader.classList.remove('loader_active');
    // Показываем данные из localStorage
    listCurrencies.append(fragment);
  } else {
    window.localStorage.setItem('currency', JSON.stringify({items: []}));
  }
}

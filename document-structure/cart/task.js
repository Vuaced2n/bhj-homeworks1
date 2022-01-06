'use strict'

const allProducts = document.querySelectorAll('.product');
const cart = document.querySelector('.cart__products');
const cartWrapper = document.querySelector('.cart');
let productInCart = [];  //id продуктов в корзине


allProducts.forEach(elem => {
  elem.addEventListener('click', cardHandler);
});
cartWrapper.addEventListener('click', removeCartProduct);


checkDataLocalstorage();


/**
 * Обработчик события на карточке товара
 * @param event
 */
function cardHandler(event) {

  let count = this.querySelector('.product__quantity-value');

  if (event.target.matches('.product__quantity-control_dec')) {
    count.innerText = +count.innerText - 1;
    if (count.innerText <= 0) count.innerText = 1;
  } else if (event.target.matches('.product__quantity-control_inc')) {
    count.innerText = +count.innerText + 1;
  } else if (event.target.matches('.product__add')) {

    checkProductCart(this);
    count.innerText = 1;
  }
}


/**
 * Создает карточку товара в корзине
 * @param element
 * @returns {HTMLDivElement}
 */
function createCardProduct(element) {
  const id = element.dataset.id;
  const imagesUrl = element.querySelector('.product__image').getAttribute('src');
  const count = element.querySelector('.product__quantity-value').innerText;
  productInCart.push(id);
  if (cartWrapper.matches('.cart__hidden')) cartWrapper.classList.remove('cart__hidden');
  return createCartElement(id, imagesUrl, count);
}


/**
 * Создаем элемент товара в корзине
 * @param id - id товара
 * @param count - Значение товара в корзине
 * @param imagesUrl - Сыылка на изображение товара
 * @returns {HTMLDivElement}
 */
function createCartElement(id, imagesUrl, count) {

  let cartElement = document.createElement('div');
  cartElement.classList.add('cart__product');
  cartElement.dataset.id = id;

  let img = document.createElement('img')
  img.classList.add('cart__product-image')
  img.setAttribute('src', imagesUrl)

  const countElement = `<div class="cart__product-count">${count}</div>`;
  const removeButton = `
            <div class="cart__product-remove">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
               <g transform="scale(2)">
                <circle style="fill:#f44336" cx="8" cy="8" r="7"/>
                <rect style="fill:#ffffff" width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                <rect style="fill:#ffffff" width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
               </g>
              </svg>
            </div>`;

  cartElement.prepend(img);
  cartElement.insertAdjacentHTML('beforeEnd', countElement);
  cartElement.insertAdjacentHTML("beforeEnd", removeButton);
  return cartElement;
}

/**
 * Проверка наличия в корзине
 * @param element
 */
function checkProductCart(element) {
  if (productInCart.includes(element.dataset.id)) {
    const cartProducts = document.querySelector('.cart__products').children;
    const repeatProduct = Array.from(cartProducts).find(elem => {
      return elem.dataset.id === element.dataset.id;
    });
    const elementCount = +element.querySelector('.product__quantity-value').innerText;
    const repeatProductCount = repeatProduct.querySelector('.cart__product-count');
    repeatProductCount.innerText = +repeatProductCount.innerText + elementCount;
  } else {
    cart.append(createCardProduct(element));
  }
  getCart();
}


/**
 * Удаление карточки из корзины
 * @param event
 */
function removeCartProduct(event) {
  const removeProduct = event.target.closest('div.cart__product');
  const clickElement = event.target.closest('div.cart__product-remove')
  if (clickElement !== null && clickElement.matches('.cart__product-remove')) {
    removeProduct.remove();
    productInCart = productInCart.filter(elem => {
      return elem !== removeProduct.dataset.id;
    });
  }
  if (productInCart.length === 0) cartWrapper.classList.add('cart__hidden');
  getCart()
}


/**
 * Проверка наличия данных в localStorage и воостановление
 */
function checkDataLocalstorage() {
  const data = JSON.parse(localStorage.getItem('cartsProduct'))
  if (data !== null && data.products.length > 0) {
    data.products.forEach(elem => {
      const {id, images, count} = elem;
      productInCart.push(id);
      cart.append(createCartElement(id, images, count));
    });
    if (cartWrapper.matches('.cart__hidden')) {
      cartWrapper.classList.remove('cart__hidden');
    }
  } else {
    localStorage.setItem('cartsProduct', JSON.stringify({products: []}));
  }
}


/**
 * Добавляет список дааные актуальных элементов в localStorage
 * @param cardsList - Массив данных
 */
function addDataLocalstorage(cardsList) {
  let data = JSON.parse(localStorage.getItem('cartsProduct'));
  data.products.length = 0;
  data.products = cardsList;
  localStorage.setItem('cartsProduct', JSON.stringify(data));
}


/**
 * Получение актуальных элементов в корзине
 */
function getCart() {
  const cartItems = document.querySelectorAll('.cart__product')
  let cardsList = []
  Array.from(cartItems).forEach(elem => {
    const imagesUrl = elem.querySelector('img').getAttribute('src');
    const count = elem.querySelector('.cart__product-count').textContent;
    cardsList.push({id: elem.dataset.id, images: imagesUrl, count: count});
  })
  addDataLocalstorage(cardsList);
}

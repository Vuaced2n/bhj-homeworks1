'use strict'

const allProducts = document.querySelectorAll('.product');
const cart = document.querySelector('.cart__products');
const cartWrapper = document.querySelector('.cart');
let productInCart = [];

allProducts.forEach(elem => {
  elem.addEventListener('click', cardHandler);
});
cartWrapper.addEventListener('click', removeCartProduct);


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
  const images = element.querySelector('.product__image');
  const count = element.querySelector('.product__quantity-value');
  let product = document.createElement('div');
  const countElement = `<div class="cart__product-count">${count.innerText}</div>`;
  const removeButton = `
            <div class="cart__product-remove">
<!--              <img src="https://img.icons8.com/flat-round/32/000000/delete-sign.png"/>-->
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" version="1.1" viewBox="0 0 32 32">
               <g transform="scale(2)">
                <circle style="fill:#f44336" cx="8" cy="8" r="7"/>
                <rect style="fill:#ffffff" width="2" height="10" x="-.98" y="-16.29" transform="rotate(135)"/>
                <rect style="fill:#ffffff" width="2" height="10" x="-12.29" y="-5.01" transform="rotate(-135)"/>
               </g>
              </svg>
            </div>`;
  product.classList.add('cart__product');
  product.dataset.id = id;
  product.prepend(images.cloneNode(false));
  product.insertAdjacentHTML('beforeEnd', countElement);
  product.insertAdjacentHTML("beforeEnd", removeButton);
  productInCart.push(id);
  if(cartWrapper.matches('.cart__hidden')) cartWrapper.classList.remove('cart__hidden');
  return product;
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
}


/**
 * Удаление карточки из корзины
 * @param event
 */
function removeCartProduct (event) {
  const removeProduct = event.target.closest('div.cart__product');
  const clickElement = event.target.closest('div.cart__product-remove')
  console.log(event.target)
  if(clickElement.matches('.cart__product-remove')) {
    removeProduct.remove();
    productInCart = productInCart.filter(elem => {
      return elem !== removeProduct.dataset.id;
    });
  }
  if (productInCart.length === 0) cartWrapper.classList.add('cart__hidden');
}

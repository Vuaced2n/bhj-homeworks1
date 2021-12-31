'use strict'

/**
 * Создает элемент подсказки
 * @param text - Сообщение подсказки
 * @param position - Позиция
 * @returns {HTMLDivElement}
 */
function createTooltip(text, position) {
  let toolTip = document.createElement('div');
  toolTip.classList.add('tooltip', 'tooltip_active');
  toolTip.setAttribute('data-position', position);
  toolTip.innerText = text;
  return toolTip;
}

/**
 * Удаляет активную подсказку
 */
function deleteTooltip() {
  const allActiveTooltip = document.querySelector('.tooltip_active');
  if (allActiveTooltip === null) return;
  allActiveTooltip.remove();
}



const tooltips = document.getElementsByClassName('has-tooltip');

Array.from(tooltips).forEach(elem => {
  elem.addEventListener('click', showTooltip)
});


function showTooltip(event) {
  event.preventDefault();
  const messageTooltip = this.getAttribute('title');
  const coordinates = this.getBoundingClientRect()

  // Тут можно поменять позицию подсказки
  let newTooltip = createTooltip(messageTooltip, 'bottom');

  if (newTooltip.dataset.position === 'bottom') {
    newTooltip.style.left = coordinates.left + 'px';
    newTooltip.style.top = coordinates.bottom + window.scrollY + 'px';

  } else if (newTooltip.dataset.position === 'right') {
    newTooltip.style.left = coordinates.right + 'px';
    newTooltip.style.top = coordinates.top + window.scrollY + 'px';


  } else if (newTooltip.dataset.position === 'left') {
    const positionX = document.body.clientWidth - coordinates.left;
    newTooltip.style.right = positionX + 'px';
    newTooltip.style.top = coordinates.top + window.scrollY + 'px';

  } else if (newTooltip.dataset.position === 'top') {
    const positionY = window.innerHeight - (coordinates.top + window.scrollY);
    newTooltip.style.left = coordinates.left + 'px';
    newTooltip.style.bottom = positionY + 'px';
  }

  deleteTooltip();
  this.insertAdjacentElement('afterEnd', newTooltip);
}


'use strict'

const checkList = document.querySelector('ul')
const checkItems = checkList.querySelectorAll('input[type="checkbox"]')

checkItems.forEach(elem => {
  elem.addEventListener('click', clickHandler)
})

function clickHandler(event) {
  const activeElement = event.target
  const childElement = activeElement.closest('li.interest').querySelector('ul.interests')

  if (childElement) {
    const checkboxItems = childElement.querySelectorAll('input[type="checkbox"]')
    checkboxItems.forEach(elem => {
      elem.checked = activeElement.checked
      elem.indeterminate = false
    })
  }

  checkParent(activeElement)
}


/**
 * Проверка родителя и чек
 * @param elem
 */
function checkParent(elem) {

  //Родитель активного элемента
  const parentActiveElement = elem.closest('ul.interests_active')

  //Если родительского элемента нет выходим
  if (parentActiveElement == null) return


  //Получаем родителя активного чекбокса
  const parentActiveCheckbox = parentActiveElement.closest('li.interest').querySelector('input[type="checkbox"]')
  // Массив дочерних элементов
  const checkboxItems = Array.from(parentActiveElement.children)


  if (checkboxItems.every(elem => {
    const checkboxItem = elem.querySelector('input[type="checkbox"]')
    return checkboxItem.checked && checkboxItem.indeterminate === false
  })) {
    //Отмечены все
    parentActiveCheckbox.indeterminate = false
    parentActiveCheckbox.checked = true
  } else if (checkboxItems.some(elem => {
    return elem.querySelector('input[type="checkbox"]').checked
  })) {
    //Отмечен хотя бы один
    parentActiveCheckbox.indeterminate = true
  } else if (checkboxItems.some(elem => {
    return elem.querySelector('input[type="checkbox"]').indeterminate === true
  })) {
    //Отмеченн хотя бы один indeterminate
    parentActiveCheckbox.indeterminate = true
  } else {
    // Не отмеченно ни одного
    parentActiveCheckbox.indeterminate = false
    parentActiveCheckbox.checked = false
  }

  checkParent(parentActiveCheckbox)
}

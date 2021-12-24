'use strict'

class CheckBox {
  constructor(container) {
    this.container = container;

    this.checkBoxAll = this.container.querySelectorAll('input[type="checkbox"]');


    this.registerEvents();
  }

  registerEvents() {
    this.checkBoxAll.forEach(elem => {
      elem.addEventListener('change', this.checkPrimary.bind(this))
    });


  }

  checkPrimary(event) {
    console.log(this.checkBoxAll);

    // Текущий элемент
    const currentElement = event.target;
    console.log('Текущий эл: ', currentElement);

    //наличие родителя
    let subCheckBoxAll = currentElement.closest('ul.interests');
    console.log('наличие родителя список: ', subCheckBoxAll);

    // let parentCheckBox;

    let parentCheckBox;

    if (subCheckBoxAll === null) {
      subCheckBoxAll = currentElement.closest('li.interest');
      parentCheckBox = currentElement;
    } else {
      parentCheckBox = subCheckBoxAll.previousElementSibling.querySelector('input');
    }
    


    // const parentCheckBox = subCheckBoxAll.previousElementSibling.querySelector('input');
    //Предыдущий главный чекбокс
    console.log('Главный чек: ', parentCheckBox);


    // Всего элементов в подсписке
    const allCheckboxValue = subCheckBoxAll.children.length;
    console.log('Всего элементов в подсписке: ', allCheckboxValue);

    // Отмечено элементов
    const activeCheckboxValue = subCheckBoxAll.querySelectorAll('input[type=checkbox]:checked').length;
    console.log('Отмечено элементов: ', activeCheckboxValue);

    if (activeCheckboxValue === allCheckboxValue) {
      parentCheckBox.indeterminate = false;
      parentCheckBox.checked = true;
    } else if (activeCheckboxValue > 0 && activeCheckboxValue < allCheckboxValue) {
      parentCheckBox.indeterminate = true;
    } else {
      parentCheckBox.indeterminate = false;
      parentCheckBox.checked = false;
    }

    
    console.log('наличие доп списка', Boolean(currentElement.closest('li').querySelector('ul')));
    
    if (Boolean(currentElement.closest('li').querySelector('ul'))) {
      
      const allSubCheckbox = currentElement.closest('li').querySelectorAll('ul > li');
      console.log('доп список', allSubCheckbox);
      
      allSubCheckbox.forEach(elem => {
        // console.log(elem)
        elem.querySelector('input').checked = currentElement.checked;
      })
    }

  }


}


const Box1 = new CheckBox(document.querySelectorAll('.interests_main > ul > li')[0]);

const Box2 = new CheckBox(document.querySelectorAll('.interests_main > ul > li')[1]);

// console.log(document.querySelectorAll('.interests_main > ul > li')[0]);

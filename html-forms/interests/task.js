'use strict'

class CheckBox {
  constructor(container) {
    this.container = container;
    this.primaryCheckBox = this.container.querySelector('.interest__check');
    this.secondCheckBox = this.container.querySelector('ul.interests');
    this.secondCheckItems = this.secondCheckBox.querySelectorAll('input[type="checkbox"]')

    this.registerEvents();
  }

  registerEvents() {
    this.primaryCheckBox.addEventListener('change', () => {
      this.checkPrimary();
    });

    this.secondCheckItems.forEach(elem => {
      elem.addEventListener('change', this.checkSecond.bind(this));
    });
  }

  checkPrimary() {
    this.secondCheckBox.querySelectorAll('input[type="checkbox"]').forEach(elem => {
      elem.checked = this.primaryCheckBox.checked;
    });
  }

  checkSecond() {
    console.log('checkSecond');

    const activeCheckValue = this.secondCheckBox.querySelectorAll('input[type="checkbox"]:checked').length;


    if (activeCheckValue > 0 && activeCheckValue < this.secondCheckItems.length) {
      this.primaryCheckBox.indeterminate = true;
    } else if (activeCheckValue === this.secondCheckItems.length) {
      this.primaryCheckBox.indeterminate = false;
      this.primaryCheckBox.checked = true;
    } else {
      this.primaryCheckBox.indeterminate = false;
      this.primaryCheckBox.checked = false;
    }
  }

}


const Box1 = new CheckBox(document.querySelectorAll('.interests_main > ul > li')[0]);
const Box2 = new CheckBox(document.querySelectorAll('.interests_main > ul > li')[1]);

// console.log(document.querySelectorAll('.interests_main > ul > li')[1])

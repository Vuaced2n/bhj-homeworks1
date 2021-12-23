'use strict'

class CheckBox {
  constructor(container) {
    this.container = container;
    this.primaryCheckBox = this.container.querySelector('.interest__check');

    this.registerEvents();

    this.log();
  }

  registerEvents() {
    this.primaryCheckBox.addEventListener('change', this.log.bind(this));
  }

  log() {
    const item = 1;
    const subCheckBox = this.container.querySelector('.interests_active');
    const subCheckBoxItems = subCheckBox.querySelectorAll('input');
    console.log(subCheckBoxItems);

    subCheckBoxItems.forEach(elem => {
      elem.checked = this.primaryCheckBox.checked;
    })
    
    // if(this.primaryCheckBox.checked) {
    //   console.log('+');
    //   subCheckBoxItems.forEach(elem => {
    //     elem.checked = true;
    //   })
    //
    // } else {
    //   console.log('-');
    // }

    // console.log(this.primaryCheckBox);

  }

}


new CheckBox(document.querySelectorAll('ul li.interest')[0]);

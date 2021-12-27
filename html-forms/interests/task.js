'use strict'

class CheckBox {
  constructor(container) {
    this.container = container;
    this.mainCheckbox = this.container.firstElementChild.querySelector('input');
    this.subCheckbox = this.container.querySelectorAll('ul.interests input');

    this.registerEvents();

  }

  registerEvents() {
    this.mainCheckbox.addEventListener('change', this.allChecked.bind(this));
    this.subCheckbox.forEach(elem => {
      elem.addEventListener('change', this.selectCheckbox.bind(this))
    });
  }

  allChecked() {
    this.subCheckbox.forEach(elem => {
      elem.checked = this.mainCheckbox.checked;
    });
  }

  selectCheckbox() {
    const activeValueCheckbox = this.container.querySelectorAll('ul.interests input[type="checkbox"]:checked').length;
    const allCheckbox = this.subCheckbox.length;

    if (activeValueCheckbox === allCheckbox) {
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = true;
    } else if (activeValueCheckbox > 0 && activeValueCheckbox < allCheckbox) {
      this.mainCheckbox.indeterminate = true;
    } else if (activeValueCheckbox === 0) {
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = false;
    }
  }
}

new CheckBox(document.querySelectorAll('.interests_main > ul > li')[0]);
new CheckBox(document.querySelectorAll('.interests_main > ul > li')[1]);

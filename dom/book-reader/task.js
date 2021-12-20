'use strict'

class BookReader {
  constructor(container) {
    this.container = container;
    this.fontSizeControl = container.querySelector('.book__control_font-size');
    this.colorControl = container.querySelector('.book__control_color');
    this.backgroundControl = container.querySelector('.book__control_background');

    this.registerEvent();
  }

  registerEvent() {
    this.fontSizeControl.addEventListener('click', this.fontsSelect.bind(this));
    this.colorControl.addEventListener('click', this.colorSelect.bind(this));
    this.backgroundControl.addEventListener('click', this.backgroundSelect.bind(this));
  }

  fontsSelect(event) {
    event.preventDefault();
    const dataSizeValue = event.target.dataset.size;

    //Убираем класс active у элементов выбора размера текста
    this.clearClass(this.fontSizeControl, 'font-size_active');

    //Проверяем доп классы у book
    this.container.classList.toggle('book_fs-small', false);
    this.container.classList.toggle('book_fs-big', false);

    if (dataSizeValue === 'small') {
      this.container.classList.add('book_fs-small');
      event.target.classList.add('font-size_active');
    } else if (dataSizeValue === 'big') {
      this.container.classList.add('book_fs-big');
      event.target.classList.add('font-size_active');
    }
  }

  colorSelect(event) {
    event.preventDefault();

    const colorData = event.target.dataset.textColor;

    this.clearClass(this.colorControl, 'color_active');

    this.container.classList.toggle('book_color-black', false);
    this.container.classList.toggle('book_color-gray', false);
    this.container.classList.toggle('book_color-whitesmoke', false);

    if (colorData === 'black') {
      this.container.classList.add('book_color-black');
      event.target.classList.add('color_active');
    } else if (colorData === 'gray') {
      this.container.classList.add('book_color-gray');
      event.target.classList.add('color_active');
    } else if (colorData === 'whitesmoke') {
      this.container.classList.add('book_color-whitesmoke');
      event.target.classList.add('color_active');
    }
  }

  backgroundSelect(event) {
    event.preventDefault();
    const bgData = event.target.dataset.bgColor;

    this.clearClass(this.backgroundControl, 'color_active');

    this.container.classList.toggle('book_bg-black', false);
    this.container.classList.toggle('book_bg-gray', false);
    this.container.classList.toggle('book_bg-white', false);

    if (bgData === 'black') {
      this.container.classList.add('book_bg-black');
      event.target.classList.add('color_active');
    } else if (bgData === 'gray') {
      this.container.classList.add('book_bg-gray');
      event.target.classList.add('color_active');
    } else if (bgData === 'white') {
      this.container.classList.add('book_bg-white');
      event.target.classList.add('color_active');
    }

  }

  clearClass(module, className) {
    module.querySelectorAll('a')
      .forEach(element => {
        element.classList.remove(`${className}`);
      });
  }
}


new BookReader(document.querySelector('#book'));

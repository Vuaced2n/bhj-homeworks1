'use strict'

class BookReader {
  constructor(container) {
    this.container = container;
    this.fontSizeControl = container.querySelector('.book__control_font-size');
    this.colorControl = container.querySelector('.book__control_color');
    this.backgroundControl = container.querySelector('.book__control_background');
    this.bookContent = container.querySelector('.book__content');

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
    this.clearClassFontSize();
    if (dataSizeValue === 'small') {
      this.container.classList.add('book_fs-small');
    } else if (dataSizeValue === 'big') {
      this.container.classList.add('book_fs-big');
    }
  }

  colorSelect(event) {
    event.preventDefault();
    // console.log('color', event.target.dataset.textColor);
    
    const colorData = event.target.dataset.textColor;
    this.clearClass(this.colorControl);
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
    console.log('bg', event.target.dataset.bgColor);
  }

  clearClassFontSize() {
    this.container.classList.toggle('book_fs-small', false);
    this.container.classList.toggle('book_fs-big', false);
  }
  
  clearClass(data) {
    data.querySelectorAll('a').forEach(item => {
      item.classList.remove('color_active');
    });
  }
}


new BookReader(document.querySelector('#book'));

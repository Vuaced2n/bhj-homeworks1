'use strict'

class HiddenScrollElement {
  constructor(container) {
    this.container = container;
    this.isVisible = false;

    this.registerEvents();
  }

  registerEvents() {
    window.addEventListener('scroll', this.showElement.bind(this));
  }

  showElement() {
    const topPosition = this.container.getBoundingClientRect().top - window.innerHeight;
    const bottomPosition = this.container.getBoundingClientRect().bottom;

    if ((topPosition < 0 && bottomPosition > 0)) {
      if (!this.isVisible) {
        this.container.classList.add('reveal_active');
        this.isVisible = true;
      }
    } else if (this.isVisible) {
      this.container.classList.remove('reveal_active');
      this.isVisible = false;
    }
  }
}

new HiddenScrollElement(document.querySelector('.reveal'));

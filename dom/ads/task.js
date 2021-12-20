class Rotator {
  constructor(container) {
    this.container = container;
    this.rotateItems = container.querySelectorAll('.rotator__case');
    this.counter = 0;
    this.interval = 1000;

    this.rotate();
  }

  rotate() {

    setTimeout(()=> {
      this.rotateItems[this.counter].classList.remove('rotator__case_active');
      this.counter++;
      if(this.counter > this.rotateItems.length - 1) this.counter = 0;
      this.rotateItems[this.counter].classList.add('rotator__case_active');
      this.interval = this.rotateItems[this.counter].dataset.speed;
      this.rotate();

    }, this.interval);
  }

}


const rotator = new Rotator(document.querySelector('.card'));

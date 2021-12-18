class Tabs {
  constructor(container) {
    // this.container = container;
    this.tabsNavigationItems = container.querySelectorAll('.tab');
    this.tabContentItems = container.querySelectorAll('.tab__content');

    this.registerEvents();
  }

  registerEvents() {
    this.tabsNavigationItems.forEach((item, idx) => {
      item.addEventListener('click', () => {
        this.checkTabs(idx);
      });
    });
  }

  checkTabs(idx) {

    this.tabsNavigationItems.forEach(item => {
      item.classList.remove('tab_active');
    });

    this.tabContentItems.forEach(item => {
      item.classList.remove('tab__content_active');
    })

    this.tabsNavigationItems[idx].classList.add('tab_active');
    this.tabContentItems[idx].classList.add('tab__content_active');
  }

}

const menuOne = new Tabs(document.querySelector('#tabs1'));
// const menuTwo = new Tabs(document.querySelector('#tabs2'));

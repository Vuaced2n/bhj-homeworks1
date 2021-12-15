const menuLink = document.querySelectorAll('a.menu__link');

menuLink.forEach(item => item.onclick = selectMenu);


/**
 * Управляет выпадающим списком
 * @returns {boolean}
 */
function selectMenu() {

  const activeItem = this.closest('li');
  const subMenuActive = activeItem.querySelector('.menu_sub');

  if (subMenuActive) {
    if (!(subMenuActive.matches('.menu_active'))) closeMenu();
    subMenuActive.classList.toggle('menu_active');
    return false;
  }
  closeMenu();
}


/**
 * Закрывает все открытые выпающие списки
 */
function closeMenu() {
  const subMenu = document.querySelectorAll('.menu_sub');
  for (let item of subMenu) {
    if (item.matches('.menu_active')) {
      item.classList.remove('menu_active');
    }
  }
}

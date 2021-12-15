const modalMain = document.getElementById('modal_main');
const modalSuccess = document.getElementById('modal_success');

setTimeout(()=> {
  modalMain.classList.add('modal_active');
  visibleModal();
},1100);


/**
 * Получает данные активного окна и развешивает события
 */
function visibleModal() {

  const activeModal = document.querySelector('.modal_active');
  const button = activeModal.querySelector('.btn');

  activeModal.querySelector('.modal__close').onclick = closeModal;

  if (button.matches('.show-success')) {
    button.onclick = ButtonModal;
  } else if (button.matches('.btn_success')) {
    button.onclick = closeModal;
  }
}


/**
 * Перекючение окон
 */
function ButtonModal() {
  modalMain.classList.remove('modal_active');
  modalSuccess.classList.add('modal_active');
  visibleModal();
}


/**
 * Закрывает окно
 */
function closeModal() {
  this.closest('div.modal').classList.remove('modal_active');
}

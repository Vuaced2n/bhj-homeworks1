/**
 * Выводит сообщение и обнуляет счетчики
 * @param data - true или false
 */
function checkGame(data) {

  setTimeout(() => {
    data ? alert('Вы победили!') : alert('Вы проиграли!');
    isDeadCounter = 0;
    isLostCounter = 0;
    isDead.innerText = `${isDeadCounter}`;
    isLost.innerText = `${isLostCounter}`;
  }, 100);
}

const isDead = document.getElementById('dead');
const isLost = document.getElementById('lost');
let isDeadCounter = +isDead.innerText;
let isLostCounter = +isLost.innerText;
let oldId = null;   //Убираем двойной клик по элементу




for (let i = 1; i < 10; i++) {
  document.getElementById(`hole${i}`).onclick = function () {
    if (this.className.includes('hole_has-mole')) {
      if (oldId !== i) {
        isDead.innerText = `${++isDeadCounter}`;
        //Закометировать
        if (isDeadCounter === 10) checkGame(true);

        //Раскометировать
        // if (isDeadCounter === 10) interval = 700;
        // if (isDeadCounter === 20) interval = 600;
        // if (isDeadCounter === 30) interval = 550;
        // if (isDeadCounter === 40) interval = 500;

        oldId = i;
      }
    } else {
      isLost.innerText = `${++isLostCounter}`;
      if (isLostCounter === 5) checkGame(false)
    }
  }
}


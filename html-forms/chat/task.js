'use strict'

class Chat {
  constructor(container) {
    this.container = container;
    this.inputField = container.querySelector('#chat-widget__input');
    this.messegesField = container.querySelector('#chat-widget__messages');
    this.botMessageList = [
      'Кто там?',
      'Вы ошиблись чатом!',
      'Я сплю!',
      'Закройте этот чат, здесь никого нет',
      'Пока, пока!',
      'Благодарю за беседу',
      'Нам лучше закончить этот разговор',
      'У вас все хорошо?',
      'Боты, как люди, разными бывают',
      'О чем поговорим?',
      'Я не бот. Не верь слухам.',
      'Утомил ты меня. Пойду чай себе сделаю. Никуда не уходи, я скоро вернусь.'
    ];

    this.registerEvent();
  }

  registerEvent() {
    this.container.addEventListener('click', () => {
      this.container.classList.add('chat-widget_active');
    });
    this.inputField.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) this.validateMessage();
    });
  }

  validateMessage() {
    if (this.inputField.value.length !== 0) {
      this.sendMessage('message_client', this.inputField.value);
    } else {
      console.warn('Пустое сообщение')
    }
    setTimeout(()=> this.sendBotMessage(), 500);

  }

  sendBotMessage() {
    const numberMessage = Math.floor(Math.random() * this.botMessageList.length);
    const botMessage = this.botMessageList[numberMessage];
    this.sendMessage('', botMessage);
  }

  sendMessage(className, textMessage) {
    const time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.messegesField.innerHTML +=
      `<div class="message ${className}">
        <div class="message__time">${time}</div>
        <div class="message__text">
         ${textMessage}
        </div>
      </div>
    `;
    this.inputField.value = '';
    // console.log(this.messegesField.lastElementChild);
    // this.messegesField.lastElementChild.scrollIntoView(false);
    console.log(this.messegesField.clientHeight)
    this.messegesField.lastElementChild.scrollTo(0, this.messegesField.clientHeight);
  }


}

new Chat(document.querySelector('.chat-widget'));

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
      'Утомил ты меня. Пойду чай себе сделаю. Никуда не уходи, я скоро вернусь.',
      'Я сейчас занят другим лицом, но как только освобожусь — займусь вашим.',
      'С вами говорит холодильник, автоответчик сейчас не может говорить у него трубы горят',
      'Сейчас хозяев нет дома и я этому рад, так что давай поговорим или же просто посидим в тишине?',
    ];
    this.botMessageCounter = [];
    this.timerId = null;

    this.registerEvent();
  }

  registerEvent() {
    this.container.querySelector('.chat-widget__side').addEventListener('click', () => {
      this.container.classList.add('chat-widget_active');
      this.waitingResponse();
    });
    this.inputField.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) this.validateMessage();
    });
    this.container.addEventListener('dblclick', () => {
      this.container.classList.remove('chat-widget_active');
      clearInterval(this.timerId);
    });
  }

  randomMessage() {
    return Math.floor(Math.random() * this.botMessageList.length);
  }

  validateMessage() {
    const inputMessage = this.inputField.value.trim();
    if (inputMessage.length !== 0) {
      this.sendMessage('message_client', inputMessage);
      setTimeout(() => this.sendBotMessage(), 500);
    }
  }

  sendBotMessage() {
    if (this.botMessageCounter.length !== this.botMessageList.length) {
      let random = this.randomMessage();

      while (this.botMessageCounter.includes(random)) {
        random = this.randomMessage();
      }

      const botMessage = this.botMessageList[random];
      this.botMessageCounter.push(random);
      this.sendMessage('', botMessage);

    } else {
      this.botMessageCounter.length = 0;
      this.sendBotMessage();
    }
  }

  sendMessage(className, textMessage) {
    const hours = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
    const minutes = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
    this.messegesField.innerHTML +=
      `<div class="message ${className}">
        <div class="message__time">${hours}:${minutes}</div>
        <div class="message__text">
         ${textMessage}
        </div>
      </div>
    `;
    this.inputField.value = '';

    //Автоскролл
    const chatContainer = this.messegesField.parentElement;
    chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;

    clearInterval(this.timerId);
    if (this.container.classList.contains('chat-widget_active')) {
      this.waitingResponse();
    }
  }

  waitingResponse() {
    this.timerId = setInterval(() => {
      this.sendBotMessage();
    }, 30000);
  }
}

new Chat(document.querySelector('.chat-widget'));

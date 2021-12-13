const counterClick = document.getElementById('clicker__counter');
const speedCounter = document.getElementById('clicker__speed-counter');
const images = document.getElementById('cookie');
let counter = +counterClick.textContent;
let oldDate = Date.now();

images.onclick = () => {
  counterClick.textContent = `${++counter}`;
  speedCounter.textContent = (1000 / (Date.now() - oldDate)).toFixed(2);
  oldDate = Date.now();
  images.width = (counter % 2) ? 220 : 200;
}


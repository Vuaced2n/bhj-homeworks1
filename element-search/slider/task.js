const slides = document.querySelectorAll('.slider__item');
const sliderArrow = document.querySelectorAll('.slider__arrow');
const slidersDots = document.querySelectorAll('.slider__dot');
let oldActiveIndex = 0;

sliderArrow.forEach(element => element.onclick = changeSlideArrow);

slidersDots.forEach((item, idx) => {
  item.onclick = () => {
    updateOldActiveIndex();
    sliderControl(idx);
  }
});

updateOldActiveIndex();
sliderControl(oldActiveIndex);


/**
 * Переключение по стрелкам
 */
function changeSlideArrow() {
  updateOldActiveIndex();
  let newActiveIndex = null;

  if (this.matches('.slider__arrow_next')) {
    newActiveIndex = oldActiveIndex + 1;
    if (newActiveIndex > slides.length - 1) newActiveIndex = 0;
  } else if (this.matches('.slider__arrow_prev')) {
    newActiveIndex = oldActiveIndex - 1;
    if (newActiveIndex < 0) newActiveIndex = slides.length - 1;
  }

  sliderControl(newActiveIndex);
}


/**
 * Переключает слайды и точки управлления
 * @param activeSlideIndex - индекс нового активного слайда
 */
function sliderControl(activeSlideIndex) {
  slides[oldActiveIndex].classList.remove('slider__item_active');
  slides[activeSlideIndex].classList.add('slider__item_active');
  slidersDots[oldActiveIndex].classList.remove('slider__dot_active');
  slidersDots[activeSlideIndex].classList.add('slider__dot_active');
}


/**
 * Обновляет текущий активный индекс элемента
 */
function updateOldActiveIndex() {
  oldActiveIndex = Array.from(slides).findIndex((element) => {
    return element.matches('.slider__item_active');
  });
}


//Простой автопереключатель
// setInterval(()=> {
//   sliderArrow[1].onclick();
// }, 1800);

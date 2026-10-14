const promotionCars = [
  {
    name: 'Marca do carro',
    make: 'Marca do carro',
    model: 'Modelo do carro',
    year: 'Ano do carro',
    mileage: 'KMs rodados',
    price: 'R$ -----',
    href: '',
    images: [],
  },
];

const promotionImage = document.querySelector('.promotion-image');
const promotionPlaceholder = document.querySelector('.promotion-placeholder');
const promotionCarArrows = document.querySelectorAll('.promotion-car-arrow');
const promotionAnglePrevious = document.querySelector('[data-angle-direction="previous"]');
const promotionAngleNext = document.querySelector('[data-angle-direction="next"]');
const promotionIndicators = document.querySelector('.promotion-indicators');
const promotionMore = document.querySelector('.promotion-more');
const promotionMake = document.querySelector('.promotion-make');
const promotionModel = document.querySelector('.promotion-model');
const promotionYear = document.querySelector('.promotion-year');
const promotionMileage = document.querySelector('.promotion-mileage');
const promotionPrice = document.querySelector('.promotion-price');

if (promotionCars.length > 0) {
  let currentPromotion = 0;
  let currentAngle = 0;

  function updateAngleControls(car) {
    const hasMultipleAngles = car.images.length > 1;
    promotionAnglePrevious.disabled = !hasMultipleAngles;
    promotionAngleNext.disabled = !hasMultipleAngles;
  }

  function showAngle(index) {
    const car = promotionCars[currentPromotion];
    currentAngle = (index + car.images.length) % car.images.length;
    promotionImage.src = car.images[currentAngle].src;
    promotionImage.alt = car.images[currentAngle].alt;
  }

  function renderImage(car) {
    const hasImages = car.images.length > 0;
    promotionImage.hidden = !hasImages;
    promotionPlaceholder.hidden = hasImages;

    if (hasImages) {
      showAngle(0);
    } else {
      promotionImage.removeAttribute('src');
      promotionImage.alt = '';
      promotionPlaceholder.setAttribute('aria-label', `Foto de ${car.name} ainda não adicionada`);
    }
  }

  function showPromotion(index) {
    currentPromotion = (index + promotionCars.length) % promotionCars.length;
    currentAngle = 0;
    const car = promotionCars[currentPromotion];

    promotionMake.textContent = car.make;
    promotionModel.textContent = car.model;
    promotionYear.textContent = car.year;
    promotionMileage.textContent = car.mileage;
    promotionPrice.textContent = car.price;
    renderImage(car);
    updateAngleControls(car);
    promotionMore.disabled = !car.href;
    promotionMore.onclick = car.href ? () => window.location.assign(car.href) : null;

    promotionIndicators.replaceChildren();
    promotionCars.forEach((promotion, promotionIndex) => {
      const indicator = document.createElement('button');
      indicator.className = 'promotion-indicator';
      indicator.type = 'button';
      indicator.setAttribute('aria-label', `Mostrar ${promotion.name}`);
      indicator.setAttribute('aria-current', String(promotionIndex === currentPromotion));
      indicator.addEventListener('click', () => showPromotion(promotionIndex));
      promotionIndicators.append(indicator);
    });
  }

  promotionCarArrows.forEach(button => {
    button.disabled = promotionCars.length < 2;
    button.addEventListener('click', () => {
      showPromotion(currentPromotion + (button.dataset.direction === 'next' ? 1 : -1));
    });
  });
  promotionAnglePrevious.addEventListener('click', () => showAngle(currentAngle - 1));
  promotionAngleNext.addEventListener('click', () => showAngle(currentAngle + 1));
  showPromotion(0);
}

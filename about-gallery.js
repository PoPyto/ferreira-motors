const aboutGalleryPhotos = [
  { src: './quem-somos/fachada.png', alt: 'Fachada da Ferreira Motors ao entardecer' },
  { src: './quem-somos/showroom.png', alt: 'Veículos expostos no showroom da Ferreira Motors' },
  { src: './quem-somos/sala-estar.png', alt: 'Sala de estar sofisticada da loja' },
  { src: './quem-somos/recepcao.png', alt: 'Recepção da Ferreira Motors' },
  { src: './quem-somos/ambiente.png', alt: 'Ambiente interno com veículos e área de convivência' },
  { src: './quem-somos/escritorio.png', alt: 'Escritório de atendimento da Ferreira Motors' },
];

const aboutSection = document.querySelector('.about-section');
const aboutGallery = document.querySelector('.about-gallery');

if (aboutSection && aboutGallery) {
  const aboutGalleryImage = aboutGallery.querySelector('.about-gallery-image');
  const aboutGalleryCounter = aboutGallery.querySelector('.about-gallery-counter');
  const aboutGalleryPrevious = aboutGallery.querySelector('.about-gallery-previous');
  const aboutGalleryNext = aboutGallery.querySelector('.about-gallery-next');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentPhoto = 0;
  let rotationTimer;

  function showPhoto(index) {
    currentPhoto = (index + aboutGalleryPhotos.length) % aboutGalleryPhotos.length;
    const photo = aboutGalleryPhotos[currentPhoto];

    aboutGalleryImage.src = photo.src;
    aboutGalleryImage.alt = photo.alt;
    aboutGalleryCounter.textContent = `${currentPhoto + 1} / ${aboutGalleryPhotos.length}`;
  }

  function stopRotation() {
    window.clearTimeout(rotationTimer);
  }

  function scheduleRotation() {
    stopRotation();
    if (
      reducedMotion.matches ||
      aboutSection.matches(':focus-within')
    ) {
      return;
    }

    rotationTimer = window.setTimeout(() => {
      showPhoto(currentPhoto + 1);
      scheduleRotation();
    }, 4000);
  }

  function changePhoto(direction) {
    showPhoto(currentPhoto + direction);
    scheduleRotation();
  }

  aboutGalleryPrevious.addEventListener('click', () => changePhoto(-1));
  aboutGalleryNext.addEventListener('click', () => changePhoto(1));
  aboutSection.addEventListener('focusin', stopRotation);
  aboutSection.addEventListener('focusout', event => {
    if (!aboutSection.contains(event.relatedTarget)) {
      scheduleRotation();
    }
  });
  reducedMotion.addEventListener('change', scheduleRotation);

  scheduleRotation();
}

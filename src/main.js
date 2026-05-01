import { Swiper } from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './scss/style.scss';

const PRELOAD_CLASS = 'preload';
const HEADER_CLASS = 'header';
const BURGER_CLASS = 'burger';
const BURGER_LINE_CLASS = `${BURGER_CLASS}__line`;
const PAGE_MENU_CLASS = 'page__menu';
const COLOR_PICKER_ID = 'color-picker';
const COLOR_PICKER_BUTTON_CLASS = 'color-picker__button';
const TECH_SPEC_IMAGE_CLASS = 'tech-spec__image';
const CAROUSEL_CLASS = 'carousel__slider';
const FEATURES_SLIDER_CLASS = 'features__slider';
const PERSONALIZE_SLIDER_CLASS = 'personalize__slider';
const ACTIVE_CLASS = '--active';
const MENU_LOGIC_CLASSES = [
  BURGER_CLASS,
  BURGER_LINE_CLASS,
  PAGE_MENU_CLASS,
];
const HEADER_ACTIVE_CLASS = HEADER_CLASS + ACTIVE_CLASS;
const COLOR_PICKER_BUTTON_ACTIVE_CLASS = COLOR_PICKER_BUTTON_CLASS + ACTIVE_CLASS;

const body = document.body;
const preloadElements = body.querySelectorAll(`.${PRELOAD_CLASS}`);
const header = body.querySelector(HEADER_CLASS);
const menuLogicElements = body.querySelectorAll(
  MENU_LOGIC_CLASSES.map(menuLogicClass => `.${menuLogicClass}`).join(',')
);
const burger = [...menuLogicElements].find(element => element.classList.contains(BURGER_CLASS));
const colorPicker = body.querySelector(`#${COLOR_PICKER_ID}`);
const techSpecImage = body.querySelector(`.${TECH_SPEC_IMAGE_CLASS}`);

let headerHasActiveClass = false;
let menuIsOpened = false;
let pageIsScrolled = false;

const getElementClass = (classNames, element) => classNames.find(className => element.classList.contains(className));

const initObserver = () => {
  const animClassNames = ['anim-text', 'anim-image', 'anim-carousel-image', 'anim-icon'];
  const elements = body.querySelectorAll(
    animClassNames.map(animClassName => `.${animClassName}`).join(',')
  );

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const element = entry.target;
      const animClass = animClassNames.find(animClassName => element.classList.contains(animClassName));

      if (!animClass) {
        return;
      }

      element.classList.add(animClass + ACTIVE_CLASS);
      obs.unobserve(element);
    });
  }, {
    rootMargin: '-50px',
  });

  elements.forEach(element => observer.observe(element));
};

window.addEventListener('load', () => {
  preloadElements.forEach(element => element.classList.remove(PRELOAD_CLASS));
});

window.addEventListener('scroll', () => {
  const windowScroll = window.scrollY;

  pageIsScrolled = windowScroll !== 0;

  if (pageIsScrolled && !headerHasActiveClass) {
    header.classList.add(HEADER_ACTIVE_CLASS);
  }

  if (!pageIsScrolled && !menuIsOpened && headerHasActiveClass) {
    header.classList.remove(HEADER_ACTIVE_CLASS)
  }

  headerHasActiveClass = header.className.includes(HEADER_ACTIVE_CLASS);
});

burger.addEventListener('click', () => {
  menuIsOpened = !menuIsOpened;

  menuLogicElements.forEach(element => {
    const elementClassName = getElementClass(MENU_LOGIC_CLASSES, element);

    if (!elementClassName) {
      return;
    }

    element.classList.toggle(elementClassName + ACTIVE_CLASS);
  });

  if (!pageIsScrolled && headerHasActiveClass) {
    header.classList.remove(HEADER_ACTIVE_CLASS);

    return;
  }

  if (headerHasActiveClass) {
    return;
  }

  header.classList.toggle(HEADER_ACTIVE_CLASS);
});

const carousel = new Swiper(`.${CAROUSEL_CLASS}`, {
  modules: [Pagination],

  initialSlide: 1,
  slidesPerView: 'auto',
  slideActiveClass: 'carousel__image--active',
  centeredSlides: true,
  speed: 300,
  allowTouchMove: false,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    bulletClass: COLOR_PICKER_BUTTON_CLASS,
    bulletActiveClass: COLOR_PICKER_BUTTON_ACTIVE_CLASS,

    renderBullet: (index, className) => {
      const colors = ['yellow', 'green', 'red'];

      return `
        <button
          type="button"
          class="${className} carousel__bullet ${className}--${colors[index]}"
        ></button>
      `;
    }
  }
});

const featuresSlider = new Swiper(`.${FEATURES_SLIDER_CLASS}`, {
  spaceBetween: 16,
});

const personalizeSlider = new Swiper(`.${PERSONALIZE_SLIDER_CLASS}`, {
  spaceBetween: 16,
  centeredSlides: true,
  centeredSlidesBounds: true,
  slidesPerView: 1,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    }
  }
})

if (colorPicker) {
  colorPicker.addEventListener('click', e => {
    const currentButton = e.target.closest(`.${COLOR_PICKER_BUTTON_CLASS}`);

    if (!currentButton) {
      return;
    }

    const prevButton = colorPicker.querySelector(`.${COLOR_PICKER_BUTTON_ACTIVE_CLASS}`);

    if (currentButton === prevButton) {
      return;
    }

    prevButton.classList.remove(COLOR_PICKER_BUTTON_ACTIVE_CLASS);
    currentButton.classList.add(COLOR_PICKER_BUTTON_ACTIVE_CLASS);
    techSpecImage.src = currentButton.dataset.src;
  });
}

initObserver();

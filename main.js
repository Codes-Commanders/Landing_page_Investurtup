const nameRegEx = /^[A-Za-zА-Яа-яЁё]+([ '-][A-Za-zА-Яа-яЁё]+)*$/;
const mailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneRegEx =
  /^\+?[0-9]{1,4}?[ -]?\(?[0-9]{2,4}\)?[ -]?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

document.addEventListener('DOMContentLoaded', function () {
  const openFormBtns = document.querySelectorAll('.open-form');
  const overlay = document.querySelector('.overlay');
  const closeFormBtn = overlay.querySelector('.close-form');
  const form = overlay.querySelector('.form');
  const inputs = form.querySelectorAll('.form__input');
  const inputCheckbox = form.querySelector('.form__input_checkbox');
  const burgerMenu = document.querySelector('.burger-menu');
  const mobileMenu = document.querySelector('.nav-menu_mobile');
  const sections = document.querySelectorAll('[data-section]');

  const inputsError = {
    name: false,
    email: false,
    phone: false,
    checkbox: false,
  };

  const toggleMobileMenu = () => {
    burgerMenu.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('lock');
  };

  const clickToLink = (e) => {
    if (e.target.className === 'nav-menu__link') {
      toggleMobileMenu();
    }
  };

  const openForm = () => {
    overlay.classList.add('active');
    document.body.classList.add('lock');
  };

  const closeForm = (e) => {
    if (
      e.target.classList.contains('overlay') ||
      e.target.closest('.close-form') ||
      e.key === 'Escape'
    ) {
      overlay.classList.remove('active');
    }

    if (!mobileMenu.classList.contains('active')) {
      document.body.classList.remove('lock');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const phone = formData.get('phone');
    const checkbox = formData.get('checkbox');

    if (!nameRegEx.test(name)) {
      inputsError.name = true;
      inputs[0].classList.add('error');
    } else {
      inputsError.name = false;
    }

    if (!mailRegEx.test(email)) {
      inputsError.email = true;
      inputs[1].classList.add('error');
    } else {
      inputsError.email = false;
    }

    if (!phoneRegEx.test(phone)) {
      inputsError.phone = true;
      inputs[2].classList.add('error');
    } else {
      inputsError.phone = false;
    }

    if (!checkbox) {
      inputsError.checked = true;
      inputCheckbox.classList.add('error');
    } else {
      inputsError.checkbox = false;
    }

    if (
      inputsError.name ||
      inputsError.email ||
      inputsError.phone ||
      inputsError.checkbox
    ) {
      return;
    }

    alert('The form has been submitted');
    form.reset();
  };

  // actions

  openFormBtns.forEach((btn) => {
    btn.addEventListener('click', openForm);
  });

  closeFormBtn.addEventListener('click', closeForm);
  overlay.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeForm);

  //form
  form.addEventListener('submit', submitForm);

  inputs.forEach((inp) => {
    inp.addEventListener('input', () => inp.classList.remove('error'));
  });

  inputCheckbox.addEventListener('click', () =>
    inputCheckbox.classList.remove('error')
  );

  // mobile menu
  burgerMenu.addEventListener('click', toggleMobileMenu);
  mobileMenu.addEventListener('click', clickToLink);

  //

  // document.addEventListener('DOMContentLoaded', function () {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.getAttribute('data-section');
        const button = document.querySelector(`[data-link="${sectionId}"]`);

        if (entry.isIntersecting) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    },
    {
      rootMargin: '-100px 0px -80%',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
});

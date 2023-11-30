// Burger menu

let burger = document.querySelector('.burger-button');
let burgerContainer = document.querySelector('.burger-container');

burger.addEventListener('click', function() {
  // let mainContainer = document.querySelector('.section-main');
  // let footerContainer = document.querySelector('.section-contacts');
  burger.classList.toggle('burger__active');
  // mainContainer.classList.toggle('hidden-area');
  // footerContainer.classList.toggle('hidden-area');
  burgerContainer.classList.toggle('burger-container__open');
  // console.log('click');
});


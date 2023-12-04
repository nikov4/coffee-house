// Burger menu

let burger = document.querySelector('.burger-button');
let burgerContainer = document.querySelector('.burger-container');

burger.addEventListener('click', function() {
  burger.classList.toggle('burger__active');
  burgerContainer.classList.toggle('burger-container__open');
});

burgerContainer.addEventListener('click', function() {
  burger.classList.remove('burger__active');
  burgerContainer.classList.remove('burger-container__open');
});
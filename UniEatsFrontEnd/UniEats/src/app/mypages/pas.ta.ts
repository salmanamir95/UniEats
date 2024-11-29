// Increment and Decrement Buttons
let decreButton = document.querySelector('.decrement') as HTMLButtonElement;
let increButton = document.querySelector('.increment') as HTMLButtonElement;
let quantInput = document.querySelector('#quantity') as HTMLInputElement;

decreButton.addEventListener('click', () => {
  const currentValue = parseInt(quantInput.value);
  if (currentValue > 1) {
    quantInput.value = (currentValue - 1).toString();
  }
});

increButton.addEventListener('click', () => {
  const currentValue = parseInt(quantInput.value);
  quantInput.value = (currentValue + 1).toString();
});

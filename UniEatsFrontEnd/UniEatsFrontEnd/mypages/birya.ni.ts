// Increment and Decrement Buttons
const decrementButton = document.querySelector('.decrement') as HTMLButtonElement;
const incrementButton = document.querySelector('.increment') as HTMLButtonElement;
const quantityInput = document.querySelector('#quantity') as HTMLInputElement;

decrementButton.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = (currentValue - 1).toString();
  }
});

incrementButton.addEventListener('click', () => {
  const currentValue = parseInt(quantityInput.value);
  quantityInput.value = (currentValue + 1).toString();
});

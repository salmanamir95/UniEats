// Add interactivity or future functionality for the page

// Example: Toggle a mobile menu
const navLinks = document.querySelector('.nav-links') as HTMLElement;
const toggleMenu = () => {
  navLinks.classList.toggle('active');
};

// Attach an event listener (if a toggle button is present)
const menuButton = document.querySelector('.menu-button');
menuButton?.addEventListener('click', toggleMenu);

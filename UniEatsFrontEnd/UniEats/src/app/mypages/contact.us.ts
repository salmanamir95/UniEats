// Handle form submission
const contactForm = document.getElementById('contactForm') as HTMLFormElement;

if (contactForm) {
  contactForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const message = (document.getElementById('message') as HTMLTextAreaElement).value;

    console.log('Form Submitted:', { name, phone, email, message });

    alert('Thank you for contacting us! We will get back to you soon.');
    contactForm.reset();
  });
}

// Handle form submission
const profileForm = document.getElementById('profileForm') as HTMLFormElement;
const cancelButton = document.getElementById('cancelButton') as HTMLButtonElement;

if (profileForm) {
  profileForm.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
    const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
    const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
    const newPassword = (document.getElementById('newPassword') as HTMLInputElement).value;
    const confirmPassword = (document.getElementById('confirmPassword') as HTMLInputElement).value;

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    console.log('Form Submitted:', { firstName, lastName, phoneNumber, newPassword });
    alert('Profile updated successfully!');
    profileForm.reset();
  });
}

if (cancelButton) {
  cancelButton.addEventListener('click', () => {
    profileForm.reset();
    alert('Changes canceled.');
  });
}

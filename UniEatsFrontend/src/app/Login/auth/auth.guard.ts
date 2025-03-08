import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const user = sessionStorage.getItem('loggedInUser'); // Get user data

  if (user) {
    return true; // User is authenticated, allow access
  } else {
    const router = new Router(); // Create a new router instance
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false; // Block access
  }
};

import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-admin',
  standalone: true,
  imports: [],
  templateUrl: './navbar-admin.component.html',
  styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  menuItems = [
    { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
    { label: 'User Management', route: '/user-management', icon: 'people' },
    { label: 'Orders/Transactions', route: '/orders', icon: 'shopping_cart' },
    { label: 'Analytics/Reports', route: '/analytics', icon: 'analytics' },
    { label: 'Settings', route: '/settings', icon: 'settings' },
  ];
  
  // Notification badge counts
  notifications = {
    approvals: 3,
    messages: 5,
  };

  // Admin actions dropdown
  adminActions = [
    { label: 'Profile', route: '/profile' },
    { label: 'Logout', route: '/logout' },
  ];

  // Quick search input value
  searchQuery = '';

  // Quick search logic (example)
  search() {
    console.log('Search for:', this.searchQuery);
  }

}

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar-admin',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './navbar-admin.component.html',
    styleUrl: './navbar-admin.component.css'
})
export class NavbarAdminComponent {
  menuItems = [
    { label: 'Dashboard', route: '/admin-dashboard', icon: 'dashboard' },
    { label: 'User Management', route: '/admin-user-management', icon: 'people' },
    { label: 'Food', route: '/admin-FOOD', icon: 'shopping_cart' }, //order, food ,transactions
    { label: 'Settings', route: '/admin-settings', icon: 'settings' },
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

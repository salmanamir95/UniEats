import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarAdminComponent } from "../navbar-admin/navbar-admin.component";

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule, FormsModule, NavbarAdminComponent],
  templateUrl: './admin-settings.component.html',
  styleUrl: './admin-settings.component.css'
})
export class AdminSettingsComponent {
  appTitle: string = '';
  theme: string = 'light';
  notificationsEnabled: boolean = true;

  constructor() {
    // Default settings could be initialized here.
    this.appTitle = 'Uni Eats Admin Panel';
  }

  saveSettings(): void {
    // Here you would save settings, either locally or through an API
    console.log('Settings saved:', {
      appTitle: this.appTitle,
      theme: this.theme,
      notificationsEnabled: this.notificationsEnabled,
    });
  }

  resetSettings(): void {
    // Reset the settings to their default values
    this.appTitle = 'Uni Eats Admin Panel';
    this.theme = 'light';
    this.notificationsEnabled = true;
  }
}

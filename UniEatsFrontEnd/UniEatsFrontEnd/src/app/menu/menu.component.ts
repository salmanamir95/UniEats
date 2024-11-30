import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    { name: 'Zinger Burger', price: 350},
    { name: 'Aaloo Samosa', price: 25},
    { name: 'Chicken Samosa', price: 50},
    { name: 'Pizza Slice', price: 200},
    { name: 'Pizza (8 slices)', price: 1200},
    { name: 'Pasta', price: 150},
    { name: 'Chicken Salan', price: 200 },
    { name: 'Chicken Biryani', price: 250 },
  ];

}

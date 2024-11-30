import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    { name: 'Zinger Burger', price: 350, imageClass: 'image' },
    { name: 'Aaloo Samosa', price: 25, imageClass: 'image-2' },
    { name: 'Chicken Samosa', price: 50, imageClass: 'image-3' },
    { name: 'Pizza Slice', price: 200, imageClass: 'image-4' },
    { name: 'Pizza (8 slices)', price: 1200, imageClass: 'image-5' },
    { name: 'Pasta', price: 150, imageClass: 'image-6' },
    { name: 'Chicken Salan', price: 200, imageClass: 'image-7' },
    { name: 'Chicken Biryani', price: 250, imageClass: 'image-8' },
  ];

}

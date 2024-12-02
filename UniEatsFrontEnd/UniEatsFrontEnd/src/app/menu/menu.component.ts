import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MenuItemComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {
  menuItems = [
    { name: 'Zinger Burger', price: 350, imageUrl: 'assets/images/zinger-burger.jpg' },
    { name: 'Aloo Samosa', price: 25, imageUrl: 'assets/images/aloosamosa.jpg' },
    { name: 'Chicken Samosa', price: 50, imageUrl: 'assets/images/chickensamosa.jpg' },
    { name: 'Pizza Slice', price: 200, imageUrl: 'assets/images/pizzaslice.jpg' },
    { name: 'Pizza (8 Slices)', price: 1200, imageUrl: 'assets/images/pizza8slices.jpg' },
    { name: 'Pasta', price: 150, imageUrl: 'assets/images/pasta.jpg' },
    { name: 'Chicken Salad', price: 200, imageUrl: 'assets/images/chickensalad.jpg' },
    { name: 'Chicken Biryani', price: 250, imageUrl: 'assets/images/chickenbiryani.jpg' },
  ];

}

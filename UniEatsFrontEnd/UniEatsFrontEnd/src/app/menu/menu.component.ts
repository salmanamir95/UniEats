import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FoodAndMenuService } from '../../services/FoodAndMenu/food-and-menu.service';
import { CartItemDTO } from '../../interfaces/cart-item-dto';
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  standalone: true, // Enables standalone components
  imports: [CommonModule, MenuItemComponent, NavbarComponent, FooterComponent],

  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  menuItems: RealFoodItemDTO[] = [];
  cartItems: CartItemDTO[] = [];

  constructor(
    private foodAndMenuService: FoodAndMenuService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.fetchMenu();
  }

  fetchMenu() {
    this.foodAndMenuService.getMenu().subscribe({
      next: (response) => {
        this.menuItems = response?.data || [];
      },
      error: (error) => console.error(error),
    });
  }

  addToCart(item: RealFoodItemDTO) {
    const existingItem = this.cartItems.find((ci) => ci.name === item.name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
  }

  changeQuantity(index: number, quantity: number) {
    if (quantity <= 0) {
      this.cartItems.splice(index, 1);
    } else {
      this.cartItems[index].quantity = quantity;
    }
  }

  clearCart() {
    this.cartItems = [];
    alert('Cart cleared');
  }
}

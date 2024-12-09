import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';
import { FoodAndMenuService } from '../../services/FoodAndMenu/food-and-menu.service';
import { GenericResponse } from '../../GenericResponse/generic-response';
import { CartService } from '../../services/cart/cart.service';
import { CartItemDTO } from '../../interfaces/cart-item-dto';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MenuItemComponent, NavbarComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: RealFoodItemDTO[] | null = []; // Declare menuItems array
  userId: number = 0; // Will store the userId extracted from URL

  constructor(
    private foodAndMenuService: FoodAndMenuService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}



  ngOnInit(): void {
    // Extract userId from URL
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Extract userId as a number
      console.log('Extracted userId:', this.userId);
    });

    // Fetch menu items
    this.foodAndMenuService.getMenu().subscribe({
      next: (response: GenericResponse<RealFoodItemDTO[]>) => {
        if (response.success) {
          this.menuItems = response.data;
        } else {
          console.error('Error fetching menu:', response.msg);
        }
      },
      error: (error) => console.error('Error fetching menu:', error),
    });
  }

  addToCart(item: RealFoodItemDTO) {
    if (!this.userId) {
      alert('User ID is not available!');
      return;
    }

    const cartItem: CartItemDTO = {
      name: item.name,
      quantity: 1, // Default quantity as 1
      price: item.price,
    };

    this.cartService.addToCart(this.userId, cartItem).subscribe({
      next: (response) => {
        if (response.success) {
          alert('Item added to cart successfully!');
        } else {
          alert('Failed to add to cart: ' + response.msg);
        }
      },
      error: (error) => {
        console.error('Error adding item to cart:', error);
        alert('An error occurred while adding the item to the cart.');
      }
    });
  }
}

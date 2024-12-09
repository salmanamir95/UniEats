import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';
import { FoodAndMenuService } from '../../services/FoodAndMenu/food-and-menu.service';
import { GenericResponse } from '../../GenericResponse/generic-response';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MenuItemComponent, NavbarComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: RealFoodItemDTO[] |null = []; // Declare menuItems array

  constructor(private foodAndMenuService: FoodAndMenuService) {}

  ngOnInit(): void {
    this.foodAndMenuService.getMenu().subscribe({
      next: (response: GenericResponse<RealFoodItemDTO[]>) => {
        if (response.success) {
          this.menuItems = response.data; // Set menu items
        } else {
          console.error('Error fetching menu:', response.msg);
        }
      },
      error: (error) => console.error('Error fetching menu:', error),
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { RealFoodItemDTO } from '../../interfaces/real-food-item-dto';
import { FoodAndMenuService } from '../../services/FoodAndMenu/food-and-menu.service';
import { GenericResponse } from '../../GenericResponse/generic-response';

@Component({
    selector: 'app-menu',
    imports: [CommonModule, MenuItemComponent, NavbarComponent, FooterComponent],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {

    menuItems: RealFoodItemDTO[] | null= null; // Declare menuItems array

    constructor(private foodAndMenuService: FoodAndMenuService) {}

    ngOnInit(): void {
      // Fetch the menu items from the service
      this.foodAndMenuService.getMenu().subscribe(
        (response: GenericResponse<RealFoodItemDTO[]>) => {
          if (response.success) {
            this.menuItems = response.data; // Set the menu items
          } else {
            console.error('Error fetching menu:', response.msg);
          }
        },
        (error) => {
          console.error('Error fetching menu:', error);
        }
      );
    }
}

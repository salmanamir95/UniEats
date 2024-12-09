import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { OrderService } from 'src/services/Order/order.service';
import { OrderDTO } from 'src/interfaces/order-dto';
import { GenericResponse } from 'src/GenericResponse/generic-response';

@Component({
  selector: 'app-menu',
  standalone: true, // Enables standalone components
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  foodItems = [
    { name: 'Margherita Pizza', description: 'Classic delight with 100% real mozzarella', price: 8.99 },
    { name: 'Cheeseburger', description: 'Juicy grilled burger with cheddar cheese', price: 7.99 },
    { name: 'Caesar Salad', description: 'Crisp romaine with parmesan and croutons', price: 6.99 },
    { name: 'Pasta Alfredo', description: 'Creamy Alfredo sauce with fettuccine', price: 9.99 },
    { name: 'Tacos', description: 'Soft corn tortillas with your choice of meat', price: 5.99 },
  ];

  ngOnInit(): void {

  }
}

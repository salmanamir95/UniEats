import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NavbarAdminComponent } from '../navbar-admin/navbar-admin.component';
import { RealFoodItemDTO } from 'src/interfaces/real-food-item-dto';
import { FoodItemService } from 'src/services/FoodItem/food-item.service';
import { GenericResponse } from 'src/GenericResponse/generic-response';

@Component({
  selector: 'app-admin-food',
  standalone: true,
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NavbarAdminComponent,
  ],
})
export class AdminFoodComponent implements OnInit {
  foodItemForm: FormGroup = new FormGroup({});
  foodItems: RealFoodItemDTO[] | null = null;
  selectedFoodItem: RealFoodItemDTO | null = null;
  searchName: string = '';
  searchCategory: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, private foodItemService: FoodItemService) {}

  ngOnInit(): void {
    this.foodItemForm = this.fb.group({
      itemId: [null],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: [''],
      availability: [true],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
    });

    this.loadFoodItems();
  }

  /** Load food items from the service */
  loadFoodItems(): void {
    this.loading = true;
    this.foodItemService.searchFood(this.searchName, this.searchCategory).subscribe(
      (response: GenericResponse<RealFoodItemDTO[]>) => {
        if (response.success) {
          this.foodItems = response.data;
        } else {
          console.error('Error loading food items:', response.msg);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error loading food items:', error);
        this.loading = false;
      }
    );
  }

  /** Triggered by the Search button to search for food items */
  searchFood(): void {
    this.loadFoodItems();
  }

  /** Handle selection of a food item from the list */
  onSelectFoodItem(foodItem: RealFoodItemDTO): void {
    this.selectedFoodItem = foodItem;
    this.foodItemForm.patchValue(foodItem);
  }

  /** Handle the deletion of a food item */
  onDeleteFoodItem(id: number): void {
    if (confirm('Are you sure you want to delete this food item?')) {
      this.foodItemService.deleteFoodItem(id).subscribe(
        (response: GenericResponse<string>) => {
          if (response.success) {
            this.loadFoodItems();
          }
        },
        (error) => {
          console.error('Error deleting food item:', error);
        }
      );
    }
  }

  /** Add a new food item or update an existing one */
  onAddOrUpdateFoodItem(): void {
    if (this.foodItemForm.invalid) return;

    const foodItemData = this.foodItemForm.value;

    if (foodItemData.itemId) {
      this.updateFoodItem(foodItemData);
    } else {
      this.addFoodItem(foodItemData);
    }
  }

  /** Call the service to add a food item */
  addFoodItem(foodItemData: RealFoodItemDTO): void {
    this.foodItemService.addFoodItem(foodItemData).subscribe(
      (response: GenericResponse<RealFoodItemDTO>) => {
        if (response.success) {
          this.loadFoodItems();
          this.foodItemForm.reset();
        }
      },
      (error) => {
        console.error('Error adding food item:', error);
      }
    );
  }

  /** Call the service to update a food item */
  updateFoodItem(foodItemData: RealFoodItemDTO): void {
    this.foodItemService.updateFoodItem(foodItemData.itemId!, foodItemData).subscribe(
      (response: GenericResponse<RealFoodItemDTO>) => {
        if (response.success) {
          this.loadFoodItems();
          this.foodItemForm.reset();
        }
      },
      (error) => {
        console.error('Error updating food item:', error);
      }
    );
  }

  /** Reset the form to its initial state */
  onResetForm(): void {
    this.foodItemForm.reset();
    this.selectedFoodItem = null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input?.files?.length) {
      const file = input.files[0];

      // Example: Handle file uploads (convert to URL for preview or handle upload logic)
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        this.foodItemForm.patchValue({ imageUrl }); // Bind the image URL to the form
      };
      reader.readAsDataURL(file); // Convert file to Base64 for preview purposes
    }
  }

}

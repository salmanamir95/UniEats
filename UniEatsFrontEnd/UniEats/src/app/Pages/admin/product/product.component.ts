import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  isSidePanelVisible: boolean = false;
  productObj: any = {
    productId: 0,
    productSku: '',
    productName: '',
    productPrice: 0,
    productShortName: '',
    productDescription: '',
    createDate: new Date(),
    deliveryTimeSpan: '',
    categoryId: 0,
    productImageUrl: '',
  };

  categoryList: any[] = [];
  productsList: any[] = [];
  constructor(private productsrv: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getAllCategory();
  }
  getProducts() {
    this.productsrv.getProducts().subscribe((res: any) => {
      this.productsList = res.data;
    });
  }
  getAllCategory() {
    this.productsrv.getCategory().subscribe((res: any) => {
      this.categoryList = res.data;
    });
  }

onUpdate(){
  this.productsrv.updateProduct(this.productObj).subscribe((res: any) => {
    debugger;
    if (res.result) {
      alert('product Updated');
      this.getProducts();
    } else {
      alert(res.message);
    }
  });
}

  onSave() {
    this.productsrv.saveProduct(this.productObj).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('product Created');
        this.getProducts();
      } else {
        alert(res.message);
      }
    });
  }

onDelete(item: any) {
  const isDelete = confirm('Do you want to delete this product?');
  if(isDelete){
    this.productsrv.deleteProduct(item.productId).subscribe((res: any) => {
      debugger;
      if (res.result) {
        alert('product Deleted');
        this.getProducts();
      } else {
        alert(res.message);
      }
    });
  }
}

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }
}

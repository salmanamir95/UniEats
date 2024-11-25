import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  isSidePanelVisible: boolean = false;
  productObj: any = {

    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productShortName": "",
    "productDescription": "",
    "createDate": new Date(),
    "deliveryTimeSpan": "",
    "categoryId": 0,
    "productImageUrl":""



  }
categoryList:any []=[];
productsList:any []=[];
  constructor(private productsrv:Productservice){

  }

  ngOnInit():void{
    this.getProducts();
this.getAllCategory();
  }
  getProducts(){
    this.productsrv.getProducts().subscribe(res:any)=>{
this.categoryList=res.date;
    }
  }
  getAllCategory(){
    this.productsrv.getCategory().subscribe(res:any)=>{
this.categoryList=res.date;
    }
  }


  onSave(){
    this.productsrv.saveProduct(this.productObj).subscribe(res:any)=>{
      debugger;
      if(res.result){
        alert("product created");
        this.getProducts();
      }
      else{
        alert(res.message);
      }
    }
  }
  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }

}

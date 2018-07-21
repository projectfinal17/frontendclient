import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
// import { ServiceCart } from '../../models/service';
import { CONSTANT } from '../../constant';
import { ProductService } from '../../@core/data/product.service';
import { ProductCategoryService } from '../../@core/data/productCategory.service';
import { ProductCart } from '../../models/service';
declare var $: any;

@Component({
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperService: HelperService,
    public productService: ProductService,
    public productCategoryService: ProductCategoryService,
    private accessiblePagesSerivce: AccessiblePageService
  ) {
  }
  saleMoneyData = {
    totalMoney: 0,
    totalCash: 0,
    totalBank: 0,
    totalCard: 0
  };
  todayString: string;
  isValidRole = false;
  //  // options: any;
  //   serviceList : any = []  ;


  //   async ngOnInit() {
  //     // this.getAllService();

  //   }
  // AddLocalCart(data){
  //   //products = JSON.parse(localStorage.getItem("avf_item"))[];
  //   this.helperService.setLocalStorage("ProductList",data);
  //   this.productList = JSON.parse(localStorage.getItem("ProductList"));
  //   console.log(this.productList.length);
  // }
  // getLocalProductCart(){
  //     this.productList = JSON.parse(localStorage.getItem("ProductList"));

  // }
  // getCountLocalProductCart(){
  //   return this.productList.length;
  // }
  // async getAllService() {
  //   let response = await this.serviceService.getAllForCustomer();
  //   this.serviceList = response.data;
  //   console.log(this.serviceList);
  // }
  productList: any = [];
  serviceList: any = [];


  async ngOnInit() {
    this.getAllService();
    this.helperService.setLocalStorage("ProductList", null);

  }
  AddLocalCart(data) {
    let list = this.helperService.getLocalStorage("ProductList") || [];

    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        if (data.id == list[i].id) {
          list[i].amount++;
          break;
        }
        else if (i == list.length - 1) {
          let newServiceCart: ProductCart;
          newServiceCart = new ProductCart();
    
          newServiceCart.setBeginProductStorage(data.id, data.productCategoryId,
            data.name, data.description, data.salePrice);
          list.push(newServiceCart);

          break;
        }
      }

    }
    else {
      let newServiceCart1: ProductCart;
      newServiceCart1 = new ProductCart();

      newServiceCart1.setBeginProductStorage(data.id, data.productCategoryId,
        data.name, data.description, data.salePrice);
      list.push(newServiceCart1);
      console.log(list);
    }
    localStorage.setItem("ProductList", JSON.stringify(list));

    let products = this.helperService.getLocalStorage("ProductList") || [];
    console.log(products);

  }
  getLocalProductCart() {
    let products = this.helperService.getLocalStorage("ProductList");
    console.log(products);

  }
  getCountLocalProductCart() {
    return this.productList.length;
  }
  async getAllService() {
    let response = await this.productService.getAllForCustomer();
    this.serviceList = response.data;
    console.log(this.serviceList);
  }
}

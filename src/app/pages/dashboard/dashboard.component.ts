import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { ServiceService } from '../../@core/data/service.service';
import {ServiceCategoryService} from '../../@core/data/serviceCategory.service';
declare var $: any;

@Component({
  selector: 'my-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    public helperService: HelperService,
    public serviceService: ServiceService,
    public serviceCategoryService: ServiceCategoryService,
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
  productList : any = [];
 // options: any;
  serviceList : any = []  ;


  async ngOnInit() {
    // this.getAllService();

  }
AddLocalCart(data){
  //products = JSON.parse(localStorage.getItem("avf_item"))[];
  this.helperService.setLocalStorage("ProductList",data);
  this.productList = JSON.parse(localStorage.getItem("ProductList"));
  console.log(this.productList.length);
}
getLocalProductCart(){
    this.productList = JSON.parse(localStorage.getItem("ProductList"));

}
getCountLocalProductCart(){
  return this.productList.length;
}
async getAllService() {
  let response = await this.serviceService.getAllForCustomer();
  this.serviceList = response.data;
  console.log(this.serviceList);
}
}

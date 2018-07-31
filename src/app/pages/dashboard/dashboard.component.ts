import { Component, OnInit } from '@angular/core';
import { HelperService } from 'app/@core/utils/helper.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
// import { ServiceCart } from '../../models/service';
import { CONSTANT } from '../../constant';
import { ProductService } from '../../@core/data/product.service';
import { ProductCategoryService } from '../../@core/data/productCategory.service';
import { ProductCart } from '../../models/service';
import { UserService } from '../../@core/data/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../@theme/components';

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
    private accessiblePagesSerivce: AccessiblePageService,
    private userService: UserService,
    private modalService: NgbModal

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
 
  productList: any = [];
  serviceList: any = [];


  async ngOnInit() {
    this.getAllService();
    this.helperService.setLocalStorage("ProductList", null);

  }
  async AddLocalCart(data) {
    let userProfile = await this.userService.getCurrentUser();

    if (userProfile == null) {
      const modalRef = this.modalService.open(LoginComponent, { backdrop: 'static' });
      return;
    }
    let list = this.helperService.getLocalStorage("ProductList") || [];
    if (list.length != 0) {
      for (let i = 0; i < list.length; i++) {
        if (data.id == list[i].productId) {
          console.log(data.id);
          console.log(list[i].productId);
          list[i].amount++;
          list[i].totalMoney = list[i].amount * list[i].salePrice;
          break;
        }
        else if (i == list.length - 1) {
          let newServiceCart: ProductCart;
          newServiceCart = new ProductCart();
          newServiceCart.setProductStorage(data.id, 
             data.salePrice,data.salePrice,data.name,data.imageUrlList);

          list.push(newServiceCart);
          this.helperService.showSuccessToast("Đã thêm vào giỏ hàng", "Thành Công");
          break;
        }
      }

    }
    else {
      let newServiceCart1: ProductCart;
      newServiceCart1 = new ProductCart();

      newServiceCart1.setProductStorage(data.id, 
        data.salePrice,data.salePrice,data.name,data.imageUrlList);
      list.push(newServiceCart1);
      this.helperService.showSuccessToast("Đã thêm vào giỏ hàng", "Thành Công");
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

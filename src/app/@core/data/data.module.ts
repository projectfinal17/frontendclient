import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { UserService } from 'app/@core/data/user.service';
import { RoleService } from 'app/@core/data/role.service';
import { AccessiblePageService } from 'app/@core/data/accessible-page.service';
import { StateService } from 'app/@core/data/state.service';
import { CustomerService } from './customer.service';
import { ProductCategoryService } from './productCategory.service';
import { OrderService } from './order.service';
import { SellingServiceService } from './sellingService.service';
import { ProductService } from './product.service';
import { PostService } from './post.service';

const SERVICES = [
  AuthService,
  UserService,
  RoleService,
  AccessiblePageService,
  StateService,
  ProductService,
  ProductCategoryService,
  CustomerService,
  OrderService,
  SellingServiceService,
  PostService
];

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ...SERVICES,
  ],
})
export class DataModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: DataModule,
      providers: [
        ...SERVICES,
      ],
    };
  }
}

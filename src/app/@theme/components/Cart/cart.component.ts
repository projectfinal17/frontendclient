import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
//import { CustomerService } from 'app/@core/data/customer.service';
import { NgbDateFRParserFormatter } from '../../../pages/commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter';
import { CustomDatepickerI18n, I18n } from '../../../pages/commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n';


@Component({
    selector: 'cart-modal-component',
    styleUrls: ['./cart.component.scss'],
    templateUrl: './cart.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class CartComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;

    private today: any = this.helperService.getTodayForDatePicker();
    amount : 0;
    TotalMoney: any;
    model: any = {
    };
    isEditMode = false;
    isKeepOpen: boolean = false;
    listAllServices_cart = [];

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private i18n: I18n,
        config: NgbDatepickerConfig,
    ) {
        // config maxDate and languge for date picker
        config.maxDate = this.today;
        this.i18n.language = this.translateService.currentLang;
    }

    async ngOnInit() {
        // if (this.editedModel) {
        //     this.isEditMode = true;
        //     this.model = this.helperService.deepCopy(this.editedModel);
        // }
       await this.getListServices_cartLocall();
      //  await this.getListCode_customes();
    }

    async  getListServices_cartLocall(){

      this.listAllServices_cart = this.helperService.getLocalStorage("ProductList") || [];
      this.SetTotalMoney();
      console.log(this.listAllServices_cart);
    }
    SetTotalMoney(){
      let a = 0;
      for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
        a += this.listAllServices_cart[i].amount * (this.listAllServices_cart[i].price - this.listAllServices_cart[i].discount);
      }
      this.TotalMoney = a;
      console.log(a);
      console.log(this.TotalMoney);
    }

    clickDownQuantityButton(id){
      for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
          if(id == this.listAllServices_cart[i].id){
            if(this.listAllServices_cart[i].amount != 0){
              this.TotalMoney -= this.listAllServices_cart[i].price - this.listAllServices_cart[i].discount;
              this.listAllServices_cart[i].amount --;
            }
          }
      }
    }
    clickUpQuantityButton(id){
      for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
          if(id == this.listAllServices_cart[i].id){
            this.TotalMoney += this.listAllServices_cart[i].price - this.listAllServices_cart[i].discount;
            this.listAllServices_cart[i].amount ++;
          }
      }
    }
    onChangeCustomerCode(id, amount){
      for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
        if(id == this.listAllServices_cart[i].id){
          this.listAllServices_cart[i].amount = amount;
        }
    }
    }

    clickSave(){
      console.log(this.listAllServices_cart);
    }

    onKeyUp(id,count){
      let a = count.toString();
      this.onChangeCustomerCode(id,count);
      this.SetTotalMoney();
      console.log(count);
    }

    removeProductFromList(data){
      for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
        if(data.id == this.listAllServices_cart[i].id){
          this.TotalMoney -= this.listAllServices_cart[i].amount * (this.listAllServices_cart[i].price - this.listAllServices_cart[i].discount);
          this.listAllServices_cart.splice(i,1);
          console.log(this.listAllServices_cart);
        }
      }
    }
    changeMoneyAmount(ServiceId){
      // for(let i= 0 ; i < this.listAllServices_cart.length ; i ++){
      //   if(data.id == this.listAllServices_cart[i].id){
      //     this.listAllServices_cart.splice(i,1);
      //     console.log(this.listAllServices_cart);
      //   }
      // }
    }


    async onClickLoginBtn() {
         let inputStorageIdList = [];
    //    for (let i = 0; i < this.isSelectedStorages.length; i++) {
    //        if (this.isSelectedStorages[i]) {
    //          inputStorageIdList.push(this.allStorages[i].id);
    //        }
    //    }
    //    this.model.birthDate = this.helperService.convertNgDatePickerToJSONFormat(this.selectedDate);
    //    this.model.inputStorageIdList = inputStorageIdList;
    //     try {
    //         if (this.isEditMode) {
    //             let response = await this.customerService.edit(this.model.id, this.model);
    //             this.helperService.showEditSuccessToast();
    //         } else {
    //             let response = await this.customerService.add(this.model);
    //             this.helperService.showAddSuccessToast();
    //             if (this.isKeepOpen) {
    //                 this.getAllCustomers();
    //                 this.model.name = null;
    //             }
    //         }
    //         if (!this.isKeepOpen) {
    //             this.activeModal.close();
    //             this.reload();
    //         }
    //     } catch (error) {
    //         this.helperService.showErrorToast(error);
    //     }
    }
}

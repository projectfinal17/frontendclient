import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../@core/data/order.service';
import { MyCartDestroyModalComponent } from '../myCart/myCart-destroy.component'


@Component({
    selector: 'myCart-component',
    templateUrl: './myCart.component.html',
    

})

export class MyCartComponent implements OnInit {


    allOrders : any [];

    constructor(
        public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private modalService: NgbModal,
        protected router: Router,
        private orderService : OrderService
    ) {

    }

    ngOnInit() {
        this.getAllOrder();
    }


    async getAllOrder() {
        let response = await this.orderService.getCustomerOrder();
        this.allOrders = response.data;
    }

    onClickBtnDestroy(order: any){
        // console.log(order);
        const modalRef = this.modalService.open( MyCartDestroyModalComponent, { backdrop: 'static' });
        modalRef.componentInstance.editedModel = order;
        modalRef.result.then( closeData=>{ this.getAllOrder() } ).catch( dissmissData=>{})
      }

}

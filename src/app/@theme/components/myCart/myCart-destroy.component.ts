import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from 'app/@core/data/order.service';
import { HelperService } from 'app/@core/utils/helper.service';

@Component({
    selector: 'myCart-destroy-modal-component',
    templateUrl: './myCart-destroy.component.html',
    providers: [
    ]
})
export class MyCartDestroyModalComponent implements OnInit {
    @Input() editedModel: any;

    model: any = {
    };

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private orderService: OrderService
    ) { }

    async ngOnInit() {
        this.model = this.helperService.deepCopy(this.editedModel);

    }
    async onClickDestroyBtn() {
        try {
            await this.orderService.DeletedOrder(this.model.id, true);
            this.helperService.showSuccessToast('success', 'destroy_myCart_successfully');
            this.activeModal.close();
        } catch (error) {
            this.helperService.showErrorToast(error);
        }

    }


}

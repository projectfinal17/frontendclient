import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { Router } from '@angular/router';
import { PostService } from '../../../@core/data/post.service';
import { ProductService } from '../../../@core/data/product.service';


@Component({
    selector: 'showDetail-component',
    templateUrl: './showDetail.component.html',
    

})

export class ShowDetailComponent implements OnInit {
    @Input() editedModel: any;
    constructor(
        public activeModal: NgbActiveModal,
        public helperService: HelperService,
        protected router: Router,
        public productService: ProductService,
    ) {

    }
    postList: any = [];
    model: any = {

    };

    ngOnInit() {
        this.getDetailPost();
    }


    
async getAllPost() {
        let response = await this.productService.getAllForCustomer();
        this.postList = response.data;
    }

    async getDetailPost() {
        let response = await this.productService.getDetail(this.editedModel.id);
        this.postList = response.data;
        console.log(this.postList);
    }

}

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { Router } from '@angular/router';
import { PostService } from '../../../@core/data/post.service';


@Component({
    selector: 'profile-component',
    templateUrl: './profile.component.html',
    

})

export class ProfileComponent implements OnInit {
    constructor(
        public activeModal: NgbActiveModal,
        public helperService: HelperService,
        protected router: Router,
        private postService : PostService
    ) {

    }
    postList: any = [];

    ngOnInit() {
        this.getAllPost();
    }


    async getAllPost() {
        let response = await this.postService.getAll();
        this.postList = response.data;
        console.log(this.postList);
    }


}

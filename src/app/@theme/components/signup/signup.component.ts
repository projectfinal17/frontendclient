import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../@core/data/auth.service';
import { UserService } from '../../../@core/data/user.service';
import { async } from '@angular/core/testing';
import { CONSTANT } from '../../../constant';


@Component({
    selector: 'signup-modal-component',
    templateUrl: './signup.component.html',

})

export class SignUpComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;
    @Output() userCreated = new EventEmitter();
    // roleNames : string;

    model: any = {
        roleNames : [CONSTANT.ROLES.USER]
    };
    isEditMode = false;
    isKeepOpen: boolean = false;
    justClickSignBtn: boolean = false;

    constructor(public activeModal: NgbActiveModal,
        public helperService: HelperService,
        private toastrService: ToastrService,
        private translateService: TranslateService,
        private authService: AuthService,
        private usersService: UserService,
    ) {

    }

    async ngOnInit() {
        
    }

    async onClickSignBtn() {
        this.justClickSignBtn = true;
        setTimeout(async () => {
            try {
                let response = await this.usersService.add(this.model);
                this.helperService.showSignUpSuccessToast();
                if (this.userCreated) {
                    this.userCreated.emit(response.id);
                }
                console.log(this.model);
            } catch (error) {
                console.log(this.model);
                this.helperService.showErrorToast(error);
            }
        }, CONSTANT.SAVE_DELAY_TIME);
        this.justClickSignBtn = false;
        console.log(this.model);
    }
}


import { Component ,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { AuthService } from '../../../@core/data/auth.service';
import { UserService } from '../../../@core/data/user.service';
import { CONSTANT } from '../../../constant';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core'; 
// import { HeaderComponent } from '../header/header.component';

@Component({
    selector: 'login-modal-component',
    templateUrl: './login.component.html',

})

export class LoginComponent {
    user: any = {
        userName: '',
        password: ''
    };
    isClickedLoginBtn: boolean = false;
    @Input() isLogin: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        public helperService: HelperService,
        protected router: Router,
        private toastrService: ToastrService,
        private authService: AuthService,
        private usersService: UserService,
        private translateService: TranslateService,
    ) {

    }

    async onClickLoginBtn() {
        this.isClickedLoginBtn = true;
        try {
            let data = await this.authService.login(this.user.userName, this.user.password);
            this.helperService.setLocalStorage(CONSTANT.ACCESS_TOKEN, data['access_token']);
            // we need to calcalate token valid timestamp (on milisecons)
            let expiresIn = data['expires_in'] * 1000;
            let validTimeStamp = + new Date() + expiresIn;
            this.helperService.setLocalStorage(CONSTANT.VALID_TIMESTAMP, validTimeStamp);
            // get user profiles & role
            let userProfile = await this.usersService.getCurrentUser();
            this.helperService.setLocalStorage(CONSTANT.USER_PROFILE, userProfile);
            this.helperService.setLocalStorage(CONSTANT.CURRENT_ROLE, userProfile.roleNames[0]);
            // get accessiable storages 
            // var storages = await this.userStorageService.getStoragesByUserId(userProfile.id);

            window.location.reload();
            console.log("Đăng nhập thành công");
            

        } catch (error) {
            let title = '';
            let message = '';
            this.translateService.get('error').subscribe((res: string) => {
                title = res;
            })
            this.translateService.get('wrong_username_or_password').subscribe((res: string) => {
                message = res;
            })
            this.toastrService.error(message, title);
            this.isClickedLoginBtn = false;
        }
    }
}

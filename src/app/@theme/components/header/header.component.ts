import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../@core/data/auth.service';
import { UserService } from 'app/@core/data/user.service';
import { HelperService } from '../../../@core/utils/helper.service';
import { CONSTANT } from '../../../constant';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../signup/signup.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position: string = 'normal';

  user: any = {};

  userMenu = [];
  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private translateService: TranslateService,
    private authService: AuthService,
    public helperService : HelperService,
    private modalService: NgbModal,
    
  ) {
  }

  async ngOnInit() {

    //try {
      let accessToken = this.helperService.getLocalStorage(CONSTANT.ACCESS_TOKEN);
      this.getSubMenu();
      // if(accessToken == null){

      // }
    //   var data = await this.userService.getCurrentUser();
    //   this.user.name = data.firstName + " " + data.lastName;
    //   this.user.picture = "assets/images/plt.jpg";

    // } catch(error) {

    //}

  }
  private getSubMenu() {
    let logout = '';
    this.translateService.get('logout').subscribe((res: string) => {
      logout = res;
    });

    let login = '';
    this.translateService.get('login').subscribe((res: string) => {
      login = res;
    });

    let signup = '';
    this.translateService.get('signup').subscribe((res: string) => {
      signup = res;
    });

    this.userMenu = [{ title:  login  , key: 'LOGIN'}, { title: logout , key: 'LOGOUT' },{ title: signup , key: 'SIGNUP' }];
  }
  menuClick(item) {
    if(item.key == 'LOGIN'){
      const modalRef = this.modalService.open(LoginComponent, { backdrop: 'static' });
      
    } 
    if(item.key == 'LOGOUT') {
      // const modalRef = this.modalService.open(Sigh, { backdrop: 'static' });
    }
    if(item.key == 'SIGNUP') {
      const modalRef = this.modalService.open(SignUpComponent, { backdrop: 'static' });
    }
  }
  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  
}

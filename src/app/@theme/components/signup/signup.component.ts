import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '../../../@core/utils/helper.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'app/@core/data/customer.service';
import { NgbDateFRParserFormatter } from '../../../pages/commons/ng-bootstrap-datepicker-util/ngb-date-fr-parser-formatter';
import { CustomDatepickerI18n, I18n } from '../../../pages/commons/ng-bootstrap-datepicker-util/ngbd-datepicker-i18n';


@Component({
    selector: 'signup-modal-component',
    templateUrl: './signup.component.html',
    providers: [{ provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter },
        I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }
    ]
})

export class SignUpComponent implements OnInit {
    @Input() editedModel: any;
    @Input() reload: any;

    private today: any = this.helperService.getTodayForDatePicker();

    model: any = {
    };
    isEditMode = false;
    isKeepOpen: boolean = false;

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
        // await this.getAllCustomers();
      //  await this.getListCode_customes();
    }
   
    

    async onClickLoginBtn() {
    //     let inputStorageIdList = [];
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

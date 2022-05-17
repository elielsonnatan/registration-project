import { Component, OnInit, ViewChild } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { RegistrationService } from 'src/app/services/registration-service.service';
import { v4 as uuidv4 } from 'uuid';
import {
  faPaperPlane,
  faArrowsRotate,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'registration-create',
  templateUrl: './registration-create.component.html',
  styleUrls: ['./registration-create.component.scss'],
})
export class RegistrationCreateComponent implements OnInit {
  vaccineSelected: string = '';
  vaccines: any = [{ id: 1, name: 'CoronaVac' }];
  faPaperPlane = faPaperPlane;
  faArrowsRotate = faArrowsRotate;
  faTriangleExclamation = faTriangleExclamation;
  inputValidationStatus: any = {
    name: true,
    birthDate: true,
    numberSusCard: true,
    applicationDate: true,
    birthDateSmallerThanCurrentDate: true,
    applicationDateSmallerThanCurrentDate: true,
    emptyVaccine: false,
  };
  patientRegistry: any = {
    registryUUID: '',
    name: '',
    birthDate: '',
    numberSusCard: '',
    dateApplicationVaccine: '',
    vaccineID: 0,
  };
  regexExpressions: any = {
    lettersAndSpace: /^[a-zA-Z\u00C0-\u00FF ]{1,}$/,
    numbers: /^[0-9]{1,}$/,
    dateCharactersPermited: /^[0-9\/\.-]{1,}$/,
    dateAcceptsFormats:
      /(\d\d\d\d\d\d\d\d)|(\d\d\/\d\d\/\d\d\d\d)|(\d\d-\d\d-\d\d\d\d)|(\d\d\/\d\d\/\d\d\d\d)/,
  };

  constructor(
    private registrationService: RegistrationService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {}

  setIdVaccine(): void {
    Object.entries(this.vaccines[0]).forEach((vaccines) => {
      if (this.vaccineSelected == vaccines[1]) {
        this.patientRegistry.vaccineId = vaccines[0];
      }
    });
  }

  validateDate(date: string, inputValidationStatus: string): void {
    debugger;
    let dateFormated: string = '';

    if (this.regexExpressions.numbers.test(date) && date.length == 8) {
      dateFormated = date;
    } else if (date.length == 10) {
      dateFormated =
        date.substring(0, 2) + date.substring(3, 5) + date.substring(6, 10);
    } else {
      if (inputValidationStatus == 'birthDate') {
        this.inputValidationStatus.birthDate = false;
        this.inputValidationStatus.birthDateSmallerThanCurrentDate = true;
      } else if (inputValidationStatus == 'applicationDate') {
        this.inputValidationStatus.applicationDate = false;
        this.inputValidationStatus.dateApplicationSmallerThanCurrentDate = true;
      }
    }

    if (inputValidationStatus == 'birthDate') {
      if (
        !this.dateService.validateDate(dateFormated) ||
        !this.regexExpressions.dateAcceptsFormats.test(dateFormated)
      ) {
        this.inputValidationStatus.birthDate = false;
      }
      if (!this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormated)) {
        this.inputValidationStatus.birthDateSmallerThanCurrentDate = false;
      }
    } else if (inputValidationStatus == 'applicationDate') {
      if (
        !this.dateService.validateDate(dateFormated) ||
        !this.regexExpressions.dateAcceptsFormats.test(dateFormated)
      ) {
        this.inputValidationStatus.applicationDate = false;
      }
      if (!this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormated)) {
        this.inputValidationStatus.dateApplicationSmallerThanCurrentDate =
          false;
      }
    }
  }

  sendForm() {
    // (patientRegistry.birthDate.length == 8 && regexExpressions.numbers.test(patientRegistry.birthDate)) && !validateDate(patientRegistry.birthDate)
  }
}

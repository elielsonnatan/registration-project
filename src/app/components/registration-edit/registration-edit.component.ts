import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { RegistrationService } from 'src/app/services/registration-service.service';
import { v4 as uuid4 } from 'uuid';
import {
  faPaperPlane,
  faArrowsRotate,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.scss'],
})
export class RegistrationEditComponent implements OnInit {
  vaccines: any = [{ id: 1, name: 'CoronaVac' }];
  faPaperPlane = faPaperPlane;
  faArrowsRotate = faArrowsRotate;
  faTriangleExclamation = faTriangleExclamation;
  patientBirthDate: string = '';
  patientDateApplicationVaccine: string = '';
  inputValidationStatus = {
    name: true,
    birthDate: true,
    numberSusCard: true,
    applicationDate: true,
    birthDateSmallerThanCurrentDate: true,
    applicationDateSmallerThanCurrentDate: true,
    emptyVaccine: false,
  };
  patientRegistry = {
    registryUUID: '',
    name: '',
    birthDate: '',
    numberSusCard: '',
    dateApplicationVaccine: '',
    vaccineID: 0,
  };
  regexExpressions = {
    lettersAndSpace: /^[a-zA-Z\u00C0-\u00FF ]+$/,
    numbers: /^\d+$/,
    dateCharactersPermitted: /^\d\/.-]+$/,
    dateAcceptsFormats:
      /(\d\d\d\d\d\d\d\d)|(\d\d\/\d\d\/\d\d\d\d)|(\d\d-\d\d-\d\d\d\d)|(\d\d.\d\d.\d\d\d\d)/,
  };
  showAlertFormInvalid: boolean = false;

  constructor(
    private registrationService: RegistrationService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {}

  validateDate(date: string, inputValidationStatus: string): void {
    let dateFormatted: string = '';

    if (this.regexExpressions.numbers.test(date) && date.length == 8) {
      dateFormatted = date;
    } else if (date.length == 10) {
      dateFormatted =
        date.substring(0, 2) + date.substring(3, 5) + date.substring(6, 10);
    } else {
      if (inputValidationStatus == 'birthDate') {
        this.inputValidationStatus.birthDate = false;
        this.inputValidationStatus.birthDateSmallerThanCurrentDate = true;
      } else if (inputValidationStatus == 'applicationDate') {
        this.inputValidationStatus.applicationDate = false;
        this.inputValidationStatus.applicationDateSmallerThanCurrentDate = true;
      }
    }

    if (inputValidationStatus == 'birthDate') {
      if (
        !this.dateService.validateDate(dateFormatted) ||
        !this.regexExpressions.dateAcceptsFormats.test(dateFormatted)
      ) {
        this.inputValidationStatus.birthDate = false;
      } else if (
        !this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormatted)
      ) {
        this.inputValidationStatus.birthDateSmallerThanCurrentDate = false;
      } else {
        this.patientBirthDate = dateFormatted;
      }
    } else if (inputValidationStatus == 'applicationDate') {
      if (
        !this.dateService.validateDate(dateFormatted) ||
        !this.regexExpressions.dateAcceptsFormats.test(dateFormatted)
      ) {
        this.inputValidationStatus.applicationDate = false;
      } else if (
        !this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormatted)
      ) {
        this.inputValidationStatus.applicationDateSmallerThanCurrentDate =
          false;
      } else {
        this.patientDateApplicationVaccine = dateFormatted;
      }
    }
  }

  validateFormToSend() {
    if (
      !this.patientRegistry.registryUUID ||
      !this.patientRegistry.name ||
      !this.patientRegistry.birthDate ||
      this.patientRegistry.numberSusCard.length < 15 ||
      !this.patientRegistry.dateApplicationVaccine ||
      this.patientRegistry.vaccineID == 0 ||
      !this.regexExpressions.lettersAndSpace.test(this.patientRegistry.name) ||
      !this.regexExpressions.dateCharactersPermitted.test(this.patientRegistry.birthDate) ||
      !this.regexExpressions.dateAcceptsFormats.test(this.patientRegistry.birthDate) ||
      !this.inputValidationStatus.birthDate ||
      !this.inputValidationStatus.birthDateSmallerThanCurrentDate ||
      !this.regexExpressions.numbers.test(this.patientRegistry.numberSusCard) ||
      !this.regexExpressions.dateCharactersPermitted.test(this.patientRegistry.dateApplicationVaccine) ||
      !this.regexExpressions.dateAcceptsFormats.test(this.patientRegistry.dateApplicationVaccine) ||
      !this.inputValidationStatus.applicationDate ||
      !this.inputValidationStatus.applicationDateSmallerThanCurrentDate
    ) {
      this.showAlertFormInvalid = true;
      setTimeout(() => {
        this.showAlertFormInvalid = false;
      }, 5000);
      return false;
    } else {
      return true;
    }
  }

  sendForm() {
    if (this.patientRegistry.vaccineID == 0) {
      this.inputValidationStatus.emptyVaccine = true;
    }
    this.patientRegistry.registryUUID = uuid4();
    if (this.validateFormToSend()) {
      this.patientRegistry.birthDate = this.patientBirthDate;
      this.patientRegistry.dateApplicationVaccine = this.patientDateApplicationVaccine;
      this.patientRegistry = {
        registryUUID: '',
        name: '',
        birthDate: '',
        numberSusCard: '',
        dateApplicationVaccine: '',
        vaccineID: 0,
      };
    }
  }
}

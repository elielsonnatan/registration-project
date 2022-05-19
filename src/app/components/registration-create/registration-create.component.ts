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
  vaccineSelected: any = null;
  vaccines: any = [{ id: 1, name: 'CoronaVac' }];
  faPaperPlane = faPaperPlane;
  faArrowsRotate = faArrowsRotate;
  faTriangleExclamation = faTriangleExclamation;
  patientBirthDate: string = '';
  patientDateApplicationVaccine: string = '';
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
      } else if (!this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormated)) {
        this.inputValidationStatus.birthDateSmallerThanCurrentDate = false;
      } else {
        this.patientBirthDate = dateFormated;
      }
    } else if (inputValidationStatus == 'applicationDate') {
      if (
        !this.dateService.validateDate(dateFormated) ||
        !this.regexExpressions.dateAcceptsFormats.test(dateFormated)
      ) {
        this.inputValidationStatus.applicationDate = false;
      } else if (!this.dateService.validateIfDateIsBiggerToCurrentDate(dateFormated)) {
        this.inputValidationStatus.dateApplicationSmallerThanCurrentDate =
          false;
      } else {
        this.patientDateApplicationVaccine = dateFormated;
      }
    }
  }

  vaccineChange(vaccineId: EventTarget) {
    if (this.inputValidationStatus.emptyVaccine) {
      this.inputValidationStatus.emptyVaccine = false;
    }

    this.patientRegistry.vaccineID = vaccineId;
  }

  sendForm() {
    if (this.patientRegistry.vaccineID == 0) {
      this.inputValidationStatus.emptyVaccine = true;
    }
    this.patientRegistry.birthDate = this.patientBirthDate;
    this.patientRegistry.dateApplicationVaccine = this.patientDateApplicationVaccine;
    this.patientRegistry.registryUUID = uuidv4();
    console.log(this.patientRegistry);
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


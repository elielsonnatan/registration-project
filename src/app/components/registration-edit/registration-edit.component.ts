import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date.service';
import { RegistrationService } from 'src/app/services/registration-service.service';
import { v4 as uuidv4 } from 'uuid';
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
  patientName: string = '';
  patientAge: string = '';
  numberSusCard: string = '';
  dateApplicationVaccine: string = '';
  vaccineSelected: string = '';
  vaccines: any = [{ id: 1, name: 'CoronaVac' }];
  newPatientObject: any = {};
  faPaperPlane = faPaperPlane;
  faArrowsRotate = faArrowsRotate;
  faTriangleExclamation = faTriangleExclamation;
  showAlertCharacter: boolean = false;
  patientUnderOneYear: boolean = false;
  allFieldsFilled: boolean = true;
  invalidDate: boolean = false;
  emptyVaccine: boolean = true;
  regexTestValid: boolean = true;

  constructor(
    private registrationService: RegistrationService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {}

  setDateApplicationVaccine(keyPressioned: KeyboardEvent): void {
    let dateVaccineApplicationArray = this.dateApplicationVaccine.split('');

    for (const iterator of dateVaccineApplicationArray) {
      if (iterator != '/' && isNaN(parseInt(iterator))) {
      } else if (
        this.dateApplicationVaccine.length == 2 &&
        keyPressioned.key != 'Backspace'
      ) {
        this.dateApplicationVaccine += '/';
      } else if (
        this.dateApplicationVaccine.length == 5 &&
        keyPressioned.key != 'Backspace'
      ) {
        this.dateApplicationVaccine += '/';
      } 
    }
  }

  conditionStyleRegex(variable: any) {
    let regexCharacter = /^[0-9]{1,}$/;

    if (!regexCharacter.test(variable) && variable != '') {
      return true;
      this.showAlertCharacter = true;
    } else {
      return false;
    }
  }

  setIdVaccine(): void {
    Object.entries(this.vaccines[0]).forEach((vaccines) => {
      if (this.vaccineSelected == vaccines[1]) {
        this.newPatientObject.vaccineId = vaccines[0];
      }
    });
  }

  validateDate(): boolean {
    if (!this.dateService.validateDate(this.dateApplicationVaccine)) {
      return false;
    } else {
      return true;
    }
  }

  regexPatientName() {
    debugger
    let regexNamePatient = /^[a-zA-Z\u00C0-\u00FF ]{1,}$/;
    if (
      !regexNamePatient.test(this.patientName) &&
      this.patientName.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  regexPatientAge() {
    debugger
    let regexAgePatient = /^[0-9]{1,}$/;
    // let regexAgePatient = /([1-9])|([0-9][1-9])|[0-9][0-9][1-9]/
    if (!regexAgePatient.test(this.patientAge) && this.patientAge.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  regexPatientSusCard() {
    debugger
    let regexNumberSusCard = /^[0-9]{1,}$/;
    if (
      !regexNumberSusCard.test(this.numberSusCard) &&
      this.numberSusCard.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  regexDataApplicationVaccine() {
    debugger
    let regexDate = /([0-9][0-9]\/[0-9][0-9]\/[0-9][0-9][0-9][0-9])/;
    if (this.dateApplicationVaccine.length == 10) {
      if (!regexDate.test(this.dateApplicationVaccine)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  sendForm(): void {
    debugger;
    if (
      !(
        this.patientName.length > 0 &&
        this.patientAge.length > 0 &&
        !this.patientUnderOneYear &&
        this.numberSusCard.length > 0 &&
        this.dateApplicationVaccine.length > 0 &&
        this.vaccineSelected.length > 0
      )
    ) {
      if (!(this.vaccineSelected.length > 0)) {
        this.emptyVaccine = true;
      }
      this.allFieldsFilled = false;
      setTimeout(() => {
        this.allFieldsFilled = true;
      }, 5000);
    } else if (!this.validateDate()) {
      this.invalidDate = true;
    } else if (
        this.regexPatientName() ||
        this.regexPatientAge() ||
        this.regexPatientSusCard() ||
        this.regexDataApplicationVaccine()
    ) {
      this.regexTestValid = false;
      setTimeout(() => {
        this.regexTestValid = true;
      }, 5000);
    } else {
      this.regexTestValid = true;
      this.newPatientObject.patientId = uuidv4();
      this.newPatientObject.name = this.patientName;
      if (this.patientUnderOneYear) {
        this.newPatientObject.age = 0;
      } else {
        this.newPatientObject.age = parseInt(this.patientAge);
      }
      this.newPatientObject.numberSusCard = parseInt(this.numberSusCard);
      this.newPatientObject.dateApplicationVaccine =
        this.dateApplicationVaccine;
      this.setIdVaccine();
      this.registrationService.insertNewRecord(this.newPatientObject);
      window.alert('Cadastro realizado com sucesso!');
      this.resetForm();
    }
    console.log(this.newPatientObject);
  }

  patientUnderOneYearChecked() {
    this.patientUnderOneYear = !this.patientUnderOneYear;
  }

  resetForm() {
    this.patientName = '';
    this.patientAge = '';
    this.numberSusCard = '';
    this.dateApplicationVaccine = '';
  }
}
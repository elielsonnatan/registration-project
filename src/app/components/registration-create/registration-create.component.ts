import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateApplicationVaccineService } from 'src/app/services/date-application-vaccine.service';
import { RegistrationService } from 'src/app/services/registration-service.service';

@Component({
  selector: 'registration-create',
  templateUrl: './registration-create.component.html',
  styleUrls: ['./registration-create.component.scss'],
})
export class RegistrationCreateComponent implements OnInit {
  charactersDate: Array<string> = [];
  validKeyCodesToDate: Array<string> = [''];
  showToastValidationsCharactersToDate: boolean = false;
  dateApplicationVaccine: string = '';
  vaccineSelected: any = 'Selecione uma Vacina';
  vaccineOptions: Array<string> = [
    'Pfizer/Biontech',
    'CoronaVac',
    'Johnson & Johnson',
    'Oxford/AstraZeneca',
  ];

  constructor(
    private registrationService: RegistrationService,
    private dateApplicationVaccineService: DateApplicationVaccineService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  setDateApplicationVaccine(keyPressioned: KeyboardEvent): void {
    let dateVaccineApplicationArray = this.dateApplicationVaccine.split('');

    dateVaccineApplicationArray.forEach((character) => {
      if (character != '/' && isNaN(parseInt(character))) {
        console.log('E  agora tabacudo');
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
    });
  }

  verifyDateFormat(): void {
    debugger;
    let dateFormateIsValid =
      this.dateApplicationVaccineService.verifyDateFormat(
        this.dateApplicationVaccine
      );

    if (dateFormateIsValid) {
      window.alert('VAI DORMIR TABACUDO');
    }
  }

  transferir(): void {

  }
}

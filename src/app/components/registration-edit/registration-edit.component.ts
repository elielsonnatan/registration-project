import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateApplicationVaccineService } from 'src/app/services/date-application-vaccine.service';
import { RegistrationService } from 'src/app/services/registration-service.service';

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: ['./registration-edit.component.scss'],
})
export class RegistrationEditComponent implements OnInit {
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
  patientId: string = '';
  patient: any = {};

  constructor(
    private registrationService: RegistrationService,
    private dateApplicationVaccineService: DateApplicationVaccineService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((params) => (this.patientId = params['id']));
  }

  ngOnInit(): void {
    debugger;
    try {
      let getPatient = this.registrationService.patientList.filter(
        (patient) => {
          if (patient.patientId == this.patientId) return patient;
        }
      );
      this.patient = getPatient[0];
      this.dateApplicationVaccine = getPatient[0].dateApplicationVaccine;
    } catch (error) {
      window.alert('Usuário não encontrado!');
    }
  }

  setDateApplicationVaccine(keyPressioned: KeyboardEvent) {
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

  sendFormRegistrationEdited() {
    this.patient.dateApplicationVaccine = this.dateApplicationVaccine;
    this.registrationService.patientList.filter((patient, index) => {
      if (patient.patientId == this.patientId) {
        this.registrationService.patientList.splice(index, 1, this.patient);
      }
    });
    this.router.navigate(['/registrations-list']);
  }
}

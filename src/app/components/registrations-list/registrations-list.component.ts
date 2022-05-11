import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DateApplicationVaccineService } from 'src/app/services/date-application-vaccine.service';
import { RegistrationService } from 'src/app/services/registration-service.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss']
})
export class RegistrationsListComponent implements OnInit {
  patientList: Array<any> = [{
    name: 'josé',
    age: 45,
    numberSusCard: '985496598552',
    dataApplicationVaccine: '25/12/2021',
    vaccine: 'Coronavac'
  },
  {
    name: 'josé',
    age: 45,
    numberSusCard: '985496598552',
    dataApplicationVaccine: '25/12/2021',
    vaccine: 'Coronavac'
  },
  {
    name: 'josé',
    age: 45,
    numberSusCard: '985496598552',
    dataApplicationVaccine: '25/12/2021',
    vaccine: 'Coronavac'
  },
  {
    name: 'josé',
    age: 45,
    numberSusCard: '985496598552',
    dataApplicationVaccine: '25/12/2021',
    vaccine: 'Coronavac'
  },
  {
    name: 'josé',
    age: 45,
    numberSusCard: '985496598552',
    dataApplicationVaccine: '25/12/2021',
    vaccine: 'Coronavac'
  }]

  iconPen = faPen;
  iconTrash = faTrash;

  constructor(private registrationService: RegistrationService,
    private dateApplicationVaccineService: DateApplicationVaccineService,
    private router: Router,){}


  ngOnInit(): void {
    
  }
}

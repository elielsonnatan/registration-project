import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RegistrationService } from 'src/app/services/registration-service.service';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html',
  styleUrls: ['./registrations-list.component.scss'],
})
export class RegistrationsListComponent implements OnInit {
  patientList: Array<any> = [];

  iconPen = faPen;
  iconTrash = faTrash;

  constructor(
    private registrationService: RegistrationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patientList = this.registrationService.patientList;
  }

  ngOnInit(): void {}

  redirectToEdit(patient: any) {
    this.router.navigate([`/registration-edit/${patient}`]);
  }

  deleteRegistration(patientId: string) {
    this.registrationService.patientList.filter((patient, index) => {
      if (patient.patientId == patientId) {
        this.registrationService.patientList.splice(index, 1);
      }
    });
    this.patientList = this.registrationService.patientList;
  }
}

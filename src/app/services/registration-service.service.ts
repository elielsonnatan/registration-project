import { Injectable } from '@angular/core';
import { DateApplicationVaccineService } from './date-application-vaccine.service';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  patientList: Array<any> = [];

  constructor(private dateApplicationVaccine: DateApplicationVaccineService) {}
}

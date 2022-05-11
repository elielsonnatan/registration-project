import { Injectable } from '@angular/core';
import { DateApplicationVaccineService } from './date-application-vaccine.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private dateApplicationVaccine: DateApplicationVaccineService) { }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl: string = 'http://127.0.0.1:3005'
  patientList: Array<any> = [];

  constructor(private http: HttpClient) {}

  insertNewRecord(newRecord: any): void{
    this.http.post(this.apiUrl + '/new-record', newRecord);
  }
}

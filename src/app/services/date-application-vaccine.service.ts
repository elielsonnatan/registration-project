import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateApplicationVaccineService {
  constructor() {}

  getDay(date: string): string {
    return date.substring(0, 2);
  }

  getMonth(date: string): string {
    return date.substring(3, 5);
  }

  getYear(date: string): string {
    return date.substring(6, 10);
  }

  convertDateToISOFormat(date: string): string {
    let newDate =
      this.getYear(date) + '-' + this.getMonth(date) + '-' + this.getDay(date);
    return newDate;
  }

  checkLeapYear(date: string): boolean {
    if (
      parseInt(this.getYear(date)) % 100 == 0 &&
      parseInt(this.getYear(date)) % 400 == 0
    ) {
      return true;
    } else if (
      parseInt(this.getYear(date)) % 100 != 0 &&
      parseInt(this.getYear(date)) % 4 == 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  verifyDateFormat(date: string): boolean {
    debugger;
    if (this.checkLeapYear(date) == false) {
      if (
        parseInt(this.getMonth(date)) == 2 &&
        parseInt(this.getDay(date)) > 28
      ) {
        return true;
      } else if (Date.parse(this.convertDateToISOFormat(date))) {
        return true;
      } else {
        return false;
      }
    } else if (Date.parse(this.convertDateToISOFormat(date))) {
      return true;
    } else {
      return false;
    }
  }
}

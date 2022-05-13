import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private monthsWith30days: Array<number> = [4, 6, 9, 11];


  constructor() { }

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
    if (parseInt(this.getYear(date)) % 100 == 0 && parseInt(this.getYear(date)) % 400 == 0) {
      return true;
    } else if (parseInt(this.getYear(date)) % 100 != 0 && parseInt(this.getYear(date)) % 4 == 0) {
      return true;
    } else {
      return false;
    }
  }

  validateDate(dateToVerify: string): boolean {
    let getDay = parseInt(this.getDay(dateToVerify));
    let getMonth = parseInt(this.getMonth(dateToVerify));
    let getYear = parseInt(this.getYear(dateToVerify));

    if (getMonth < 1 && getMonth > 12) {
      return false
    }

    if (getYear < 1) {
      return false
    }

    if (getMonth == 2) {
      if (this.checkLeapYear(dateToVerify) == true) {
        if (getDay > 0 && getDay < 30) {
          return true
        } else {
          return false
        }
      } else if (getDay > 0 && getDay < 29) {
        return true
      } else {
        return false
      }
    }

    if(this.monthsWith30days.includes(getMonth)) {
      if (getDay > 0 && getDay < 31) {
        return true
      } else {
        return false
      }
    } else if (getDay > 0 && getDay < 32) {
      return true
    } else {
      return false
    }
  }

  validateIfDateIsBiggerToCurrentDate(dateToVerify: string): boolean{
    let getDay = parseInt(this.getDay(dateToVerify));
    let getMonth = parseInt(this.getMonth(dateToVerify)) - 1;
    let getYear = parseInt(this.getYear(dateToVerify));

    let date = new Date;
    if (getDay > date.getDate() || getMonth > (date.getMonth() + 1) || getYear > date.getFullYear()) {
      return false
    } else {
      return true
    }
  }
}

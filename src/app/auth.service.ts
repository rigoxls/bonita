import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {config} from './resources/config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  async checkAuthenticated() {
    return this.isAuthenticated.value;
  }

  async login(username: string, password: string) {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Expose-Headers': 'set-cookie'
    };
    const body = `username=${username}&password=${password}&redirect=false&redirectURL=`;
    await this.http.post<any>(`${config.bonitaUrl}/loginservice`, body,
      {headers}).subscribe(data => {
        this.isAuthenticated.next(true);
        this.router.navigate(['dashboard']);
      },
      error => {
        this.isAuthenticated.next(false);
        console.info('error: >>>', error);
        throw Error('Error');
      });
  }

  async logout(redirect: string) {
    try {
      this.isAuthenticated.next(false);
      this.router.navigate(['login']);
    } catch (err) {
      console.error(err);
    }
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import {config} from './resources/config';

@Injectable({
  providedIn: 'root'
})
export class BpmService {

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private http: HttpClient) {
  }

  async getProcessInfo() {
    const sessionToken = this.cookieService.get('X-Bonita-API-Token');
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Bonita-API-Token': sessionToken
    };
    await this.http.get<any>(`${config.bonitaUrl}/API/bpm/process?s=af_colfondos`,
      {headers}).subscribe(data => {
        localStorage.setItem('processInfo', JSON.stringify(data[0]));
        this.initProcess();
      },
      error => {
      });
  }

  initProcess() {
    const sessionToken = this.cookieService.get('X-Bonita-API-Token');
    const processInfo = JSON.parse(localStorage.getItem('processInfo'));
    const headers = {
      'Content-Type': 'application/json',
      'X-Bonita-API-Token': sessionToken
    };
    this.http.post<any>(`${config.bonitaUrl}/API/bpm/process/${processInfo.id}/instantiation`, {},
      {headers}).subscribe(data => {},
      error => {
        console.log(error);
      });
  }

  async getTasksList() {
    const sessionToken = this.cookieService.get('X-Bonita-API-Token');
    const processInfo = JSON.parse(localStorage.getItem('processInfo'));
    let tasks = [];
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Bonita-API-Token': sessionToken
    };
    await this.http.get<any>(`${config.bonitaUrl}/API/bpm/task?c=10&p=0&f=processId=${processInfo.id}&o=state`,
      {headers}).toPromise().then(data => {
        tasks = data;
      },
      error => {
      });

    return tasks;
  }

  executeTask(userTaskId, data) {
    const sessionToken = this.cookieService.get('X-Bonita-API-Token');
    const processInfo = JSON.parse(localStorage.getItem('processInfo'));
    const headers = {
      'Content-Type': 'application/json',
      'X-Bonita-API-Token': sessionToken
    };
    this.http.post<any>(`${config.bonitaUrl}/API/bpm/userTask/${userTaskId}/execution?assign=true`, data,
      {headers}).subscribe(data => {},
      error => {
        console.log(error);
      });
  }

}

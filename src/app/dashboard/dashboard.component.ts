import {Component, OnInit} from '@angular/core';
import {BpmService} from '../bpm.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private tasks: Array<any>;
  private basicDataTask = false;
  private securityQuestions = false;
  private userDataTask = false;
  private validateRiskProfile = false;
  private userSurveyTask = false;

  private taskId = null;
  private caseId = null;

  constructor(
    private bpmService: BpmService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.bpmService.getProcessInfo();
    this.getTasksList();
  }

  async getTasksList() {
    this.tasks = await this.bpmService.getTasksList();
  }

  takeTask(taskId: number, caseId: number, displayDescription: string) {
    this.taskId = taskId;
    this.caseId = caseId;

    localStorage.setItem('caseId', this.caseId);

    switch (displayDescription) {
      case 'basicDataTask':
        this.basicDataTask = true;
        this.securityQuestions = false;
        this.validateRiskProfile = false;
        this.userDataTask = false;
        this.userSurveyTask = false;
        break;

      case 'securityQuestions':
        this.basicDataTask = false;
        this.userDataTask = false;
        this.validateRiskProfile = false;
        this.securityQuestions = true;
        this.userSurveyTask = false;
        break;

      case 'userData':
        this.userDataTask = true;
        this.basicDataTask = false;
        this.validateRiskProfile = false;
        this.securityQuestions = false;
        this.userSurveyTask = false;
        break;

      case 'validateRiskProfile':
        this.userDataTask = false;
        this.basicDataTask = false;
        this.securityQuestions = false;
        this.validateRiskProfile = true;
        this.userSurveyTask = false;
        break;

      case 'userSurveyTask':
        this.userDataTask = false;
        this.basicDataTask = false;
        this.securityQuestions = false;
        this.validateRiskProfile = false;
        this.userSurveyTask = true;
        break;
    }
  }
}

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
  private taskId = null;

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

  takeTask(taskId: number, displayDescription: string) {
    this.taskId = taskId;

    switch (displayDescription) {
      case 'basicDataTask':
        this.basicDataTask = true;
        this.securityQuestions = false;
        break;
      case 'securityQuestions':
        this.basicDataTask = false;
        this.securityQuestions = true;
        break;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {BpmService} from '../bpm.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private tasks: Array<any>;

  constructor(
    private bpmService: BpmService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.bpmService.getProcessInfo();
    this.getTasksList();
  }

  async getTasksList() {
    this.tasks = await this.bpmService.getTasksList();
  }

  redirectToTask(taskId: number) {
    //this.router.navigate(['user-task'], { queryParams: { taskId } });
  }
}

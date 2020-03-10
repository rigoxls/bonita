import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {
  private taskId: string;

  constructor(
    private route: ActivatedRoute,
    private bpmService: BpmService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.taskId = params.taskId;
      this.sendDataToForm(this.taskId);
    });
  }

  sendDataToForm(taskId) {
    //this.bpmService.executeTask(taskId);
  }

}

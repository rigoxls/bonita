import {Component, OnInit, Input} from '@angular/core';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-validate-data-task',
  templateUrl: './validate-data-task.component.html',
  styleUrls: ['./validate-data-task.component.css']
})
export class ValidateDataTaskComponent implements OnInit {

  private formErrors = false;

  private formData = {
    answer_1: null,
    answer_2: null,
    answer_3: null
  };

  @Input() taskId: string = null;

  private validatedStep = false;

  constructor(private bpmService: BpmService) {
  }

  ngOnInit() {
  }

  sendDataToForm() {
    this.bpmService.executeTask(this.taskId, this.formData);
  }

}

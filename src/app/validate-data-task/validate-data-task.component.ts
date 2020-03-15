import {Component, OnInit, Input} from '@angular/core';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-validate-data-task',
  templateUrl: './validate-data-task.component.html',
  styleUrls: ['./validate-data-task.component.css']
})
export class ValidateDataTaskComponent implements OnInit {

  private formErrors = false;
  private hideForm = false;

  private formData = {
    answer_1: null,
    answer_2: null,
    answer_3: null
  };

  @Input() taskId: string = null;

  private validatedStep = false;
  private localVariables = {};

  constructor(private bpmService: BpmService) {
  }

  ngOnInit() {
    debugger;
    this.getLocalVariables();
  }

  async getLocalVariables() {
    this.localVariables = await this.bpmService.getCaseIdVariables();
  }

  sendDataToForm() {
    if (!this.formData.answer_1 || !this.formData.answer_2 || !this.formData.answer_3) {
      this.formErrors = true;
      this.validatedStep = true;
      return false;
    } else {
      this.bpmService.executeTask(this.taskId, this.formData).then(() => {
        this.hideForm = true;
      });
    }
  }

}

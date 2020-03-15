import {Component, Input, OnInit} from '@angular/core';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-user-survey-task',
  templateUrl: './user-survey-task.component.html',
  styleUrls: ['./user-survey-task.component.css']
})
export class UserSurveyTaskComponent implements OnInit {

  private formErrors = false;
  private hideForm = false;

  @Input() taskId: string = null;

  private validatedStep = false;
  private localVariables = {};

  private formData = {
    answer_survey_1: null,
    answer_survey_2: null,
    answer_survey_3: null,
    answer_survey_4: null,
    answer_survey_5: null
  };

  constructor(private bpmService: BpmService) {
  }

  ngOnInit() {
    this.getLocalVariables();
  }

  async getLocalVariables() {
    this.localVariables = await this.bpmService.getCaseIdVariables();
  }

  sendDataToForm() {
    if (!this.formData.answer_survey_1 || !this.formData.answer_survey_2 ||
      !this.formData.answer_survey_3 || !this.formData.answer_survey_4 ||
      !this.formData.answer_survey_5) {
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

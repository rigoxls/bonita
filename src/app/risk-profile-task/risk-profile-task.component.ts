import {Component, Input, OnInit} from '@angular/core';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-risk-profile-task',
  templateUrl: './risk-profile-task.component.html',
  styleUrls: ['./risk-profile-task.component.css']
})
export class RiskProfileTaskComponent implements OnInit {

  private formErrors = false;
  private hideForm = false;

  @Input() taskId: string = null;

  private validatedStep = false;
  private localVariables = {};

  private formData = {
    answer_profile_1: null,
    answer_profile_2: null,
    answer_profile_3: null,
    answer_profile_4: null,
    answer_profile_5: null,
    validate_profile: null,
    profile_comments: null
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
    if (!this.formData.validate_profile  || !this.formData.profile_comments) {
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

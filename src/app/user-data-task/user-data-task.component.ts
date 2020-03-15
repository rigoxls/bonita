import {Component, Input, OnInit} from '@angular/core';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-user-data-task',
  templateUrl: './user-data-task.component.html',
  styleUrls: ['./user-data-task.component.css']
})
export class UserDataTaskComponent implements OnInit {

  private formErrors = false;
  private hideForm = false;

  @Input() taskId: string = null;

  private validatedStep = false;
  private localVariables = {};

  private formData = {
    apellidos: null,
    nombres: null,
    fnacimiento: null,
    telefono: null,
    ciudad: null,
    direccion: null
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
    if (!this.formData.apellidos || !this.formData.nombres || !this.formData.fnacimiento
      || !this.formData.ciudad) {
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

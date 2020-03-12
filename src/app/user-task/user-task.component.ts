import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BpmService} from '../bpm.service';

@Component({
  selector: 'app-user-task',
  templateUrl: './user-task.component.html',
  styleUrls: ['./user-task.component.css']
})
export class UserTaskComponent implements OnInit {
  private taskId: string;
  private step1 = true;
  private step2 = false;
  private step3 = false;
  private step4 = false;
  private step5 = false;
  private step6 = false;
  private formErrors = false;

  private flagHideCompanyForm = false;

  private formData = {
    cedula: null,
    correo: null,
    celular: null,
    pais: 'colombia',
    departamento: null,
    direccion: null,
    telefono: null,
    tipoTrabajo: 1,
    nit: null,
    razonSocial: null,
    cargo: null,
    salario: null,
    pep: null,
    apep: null,
    TIP: null,
    AC: null,
    FE: null
  };

  private validatedStep = false;

  constructor(
    private route: ActivatedRoute,
    private bpmService: BpmService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.taskId = params.taskId;
      this.sendDataToForm(this.taskId);
    });
  }

  sendDataToForm(taskId) {
    //this.bpmService.executeTask(taskId);
  }

  nextForm(nextFormId) {
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
    this.step6 = false;

    let isValid = false;

    switch (nextFormId) {
      case 1:
        this.step1 = true;
        break;
      case 2:
        isValid = this.validateStep1();
        if (isValid) {
          this.formErrors = false;
          this.validatedStep = false;
          this.step2 = true;
        } else {
          this.step1 = true;
        }
        break;
      case 3:
        isValid = this.validateStep2();
        if (isValid) {
          this.formErrors = false;
          this.validatedStep = false;
          this.step3 = true;
        } else {
          this.step2 = true;
        }
        break;
      case 4:
        isValid = this.validateStep3();
        if (isValid) {
          this.formErrors = false;
          this.validatedStep = false;
          this.step4 = true;
        } else {
          this.step3 = true;
        }
        break;
      case 5:
        isValid = this.validateStep4();
        if (isValid) {
          this.formErrors = false;
          this.validatedStep = false;
          this.step5 = true;
        } else {
          this.step4 = true;
        }
        break;
      case 6:
        isValid = this.validateStep5();
        if (isValid) {
          this.formErrors = false;
          this.validatedStep = false;
          this.step6 = true;
        } else {
          this.step5 = true;
        }
        break;
    }
  }

  validateStep1(): boolean {
    this.validatedStep = true;
    if (!this.formData.cedula || !this.formData.celular || !this.formData.correo) {
      this.formErrors = true;
      return false;
    }
    return true;
  }

  validateStep2(): boolean {
    this.validatedStep = true;
    if (!this.formData.departamento || !this.formData.direccion || !this.formData.telefono) {
      this.formErrors = true;
      return false;
    }
    return true;
  }

  validateStep3(): boolean {
    this.validatedStep = true;
    if (!this.flagHideCompanyForm) {
      if (!this.formData.nit || !this.formData.razonSocial || !this.formData.cargo || !this.formData.salario) {
        this.formErrors = true;
        return false;
      }
    }
    return true;
  }

  validateStep4(): boolean {
    this.validatedStep = true;
    if (!this.formData.pep) {
      this.formErrors = true;
      return false;
    }
    return true;
  }

  validateStep5(): boolean {
    this.validatedStep = true;
    if (!this.formData.apep) {
      this.formErrors = true;
      return false;
    }
    return true;
  }

  hideCompanyForm(hide): void {
    this.formErrors = false;
    this.flagHideCompanyForm = (hide) ? true : false;
  }

  enviarDatos() {
    console.info(this.formData);
  }

}

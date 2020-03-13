import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateDataTaskComponent } from './validate-data-task.component';

describe('ValidateDataComponent', () => {
  let component: ValidateDataTaskComponent;
  let fixture: ComponentFixture<ValidateDataTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidateDataTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateDataTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

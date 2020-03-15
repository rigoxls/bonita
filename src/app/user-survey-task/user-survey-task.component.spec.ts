import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSurveyTaskComponent } from './user-survey-task.component';

describe('UserSurveyTaskComponent', () => {
  let component: UserSurveyTaskComponent;
  let fixture: ComponentFixture<UserSurveyTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSurveyTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSurveyTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

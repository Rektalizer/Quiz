import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizActionButtonsComponent } from './quiz-action-buttons.component';

describe('QuizActionButtonsComponent', () => {
  let component: QuizActionButtonsComponent;
  let fixture: ComponentFixture<QuizActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizActionButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

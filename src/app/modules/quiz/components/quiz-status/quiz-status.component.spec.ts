import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizStatusComponent } from './quiz-status.component';

describe('QuizStatusComponent', () => {
  let component: QuizStatusComponent;
  let fixture: ComponentFixture<QuizStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

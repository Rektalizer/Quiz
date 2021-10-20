import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizSelectorComponent } from './quiz-selector.component';

describe('QuizSelectorComponent', () => {
  let component: QuizSelectorComponent;
  let fixture: ComponentFixture<QuizSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

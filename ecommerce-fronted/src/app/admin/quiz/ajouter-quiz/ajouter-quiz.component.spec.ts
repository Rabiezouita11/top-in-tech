import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterQuizComponent } from './ajouter-quiz.component';

describe('AjouterQuizComponent', () => {
  let component: AjouterQuizComponent;
  let fixture: ComponentFixture<AjouterQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

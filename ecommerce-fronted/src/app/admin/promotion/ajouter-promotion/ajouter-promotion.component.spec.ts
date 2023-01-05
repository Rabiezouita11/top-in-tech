import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPromotionComponent } from './ajouter-promotion.component';

describe('AjouterPromotionComponent', () => {
  let component: AjouterPromotionComponent;
  let fixture: ComponentFixture<AjouterPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

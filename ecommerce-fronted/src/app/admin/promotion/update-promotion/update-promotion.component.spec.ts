import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePromotionComponent } from './update-promotion.component';

describe('UpdatePromotionComponent', () => {
  let component: UpdatePromotionComponent;
  let fixture: ComponentFixture<UpdatePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

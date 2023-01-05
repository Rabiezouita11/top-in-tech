import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCategoryComponent } from './ajouter-category.component';

describe('AjouterCategoryComponent', () => {
  let component: AjouterCategoryComponent;
  let fixture: ComponentFixture<AjouterCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

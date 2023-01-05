import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterLivreurComponent } from './ajouter-livreur.component';

describe('AjouterLivreurComponent', () => {
  let component: AjouterLivreurComponent;
  let fixture: ComponentFixture<AjouterLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

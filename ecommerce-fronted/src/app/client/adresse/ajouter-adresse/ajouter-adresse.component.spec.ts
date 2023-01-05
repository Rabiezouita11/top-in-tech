import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterAdresseComponent } from './ajouter-adresse.component';

describe('AjouterAdresseComponent', () => {
  let component: AjouterAdresseComponent;
  let fixture: ComponentFixture<AjouterAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterAdresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

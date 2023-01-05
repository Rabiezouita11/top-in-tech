import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCommandeComponent } from './etat-commande.component';

describe('EtatCommandeComponent', () => {
  let component: EtatCommandeComponent;
  let fixture: ComponentFixture<EtatCommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtatCommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeComponent } from './commande.component';

describe('CommandeComponent', () => {
  let component: CommandeComponent;
  let fixture: ComponentFixture<CommandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

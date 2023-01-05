import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAdresseComponent } from './update-adresse.component';

describe('UpdateAdresseComponent', () => {
  let component: UpdateAdresseComponent;
  let fixture: ComponentFixture<UpdateAdresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAdresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

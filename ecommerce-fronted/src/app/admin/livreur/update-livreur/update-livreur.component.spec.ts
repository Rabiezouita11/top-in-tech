import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLivreurComponent } from './update-livreur.component';

describe('UpdateLivreurComponent', () => {
  let component: UpdateLivreurComponent;
  let fixture: ComponentFixture<UpdateLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

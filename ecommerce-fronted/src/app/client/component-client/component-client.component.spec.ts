import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentClientComponent } from './component-client.component';

describe('ComponentClientComponent', () => {
  let component: ComponentClientComponent;
  let fixture: ComponentFixture<ComponentClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

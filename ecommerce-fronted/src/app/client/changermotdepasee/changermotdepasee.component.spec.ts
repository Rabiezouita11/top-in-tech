import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangermotdepaseeComponent } from './changermotdepasee.component';

describe('ChangermotdepaseeComponent', () => {
  let component: ChangermotdepaseeComponent;
  let fixture: ComponentFixture<ChangermotdepaseeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangermotdepaseeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangermotdepaseeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

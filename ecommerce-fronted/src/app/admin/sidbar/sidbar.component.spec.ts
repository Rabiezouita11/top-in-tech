import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidbarComponent } from './sidbar.component';

describe('SidbarComponent', () => {
  let component: SidbarComponent;
  let fixture: ComponentFixture<SidbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

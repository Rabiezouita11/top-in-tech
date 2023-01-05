import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReponseComponent } from './reponse.component';

describe('ReponseComponent', () => {
  let component: ReponseComponent;
  let fixture: ComponentFixture<ReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

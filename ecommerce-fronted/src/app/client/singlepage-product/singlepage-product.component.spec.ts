import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglepageProductComponent } from './singlepage-product.component';

describe('SinglepageProductComponent', () => {
  let component: SinglepageProductComponent;
  let fixture: ComponentFixture<SinglepageProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglepageProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinglepageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

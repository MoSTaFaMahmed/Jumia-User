import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOfficeProductsComponent } from './home-office-products.component';

describe('HomeOfficeProductsComponent', () => {
  let component: HomeOfficeProductsComponent;
  let fixture: ComponentFixture<HomeOfficeProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeOfficeProductsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeOfficeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

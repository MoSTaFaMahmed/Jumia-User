import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerdataComponent } from './sellerdata.component';

describe('SellerdataComponent', () => {
  let component: SellerdataComponent;
  let fixture: ComponentFixture<SellerdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

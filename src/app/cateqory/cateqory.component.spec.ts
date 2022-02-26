import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateqoryComponent } from './cateqory.component';

describe('CateqoryComponent', () => {
  let component: CateqoryComponent;
  let fixture: ComponentFixture<CateqoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CateqoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CateqoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

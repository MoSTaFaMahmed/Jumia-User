import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticcomponentComponent } from './staticcomponent.component';

describe('StaticcomponentComponent', () => {
  let component: StaticcomponentComponent;
  let fixture: ComponentFixture<StaticcomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaticcomponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

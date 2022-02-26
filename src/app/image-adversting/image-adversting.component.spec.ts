import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAdverstingComponent } from './image-adversting.component';

describe('ImageAdverstingComponent', () => {
  let component: ImageAdverstingComponent;
  let fixture: ComponentFixture<ImageAdverstingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAdverstingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAdverstingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

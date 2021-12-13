import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMealComponent } from './print-meal.component';

describe('PrintMealComponent', () => {
  let component: PrintMealComponent;
  let fixture: ComponentFixture<PrintMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

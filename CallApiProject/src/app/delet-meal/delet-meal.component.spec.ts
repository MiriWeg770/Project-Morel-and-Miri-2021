import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletMealComponent } from './delet-meal.component';

describe('DeletMealComponent', () => {
  let component: DeletMealComponent;
  let fixture: ComponentFixture<DeletMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

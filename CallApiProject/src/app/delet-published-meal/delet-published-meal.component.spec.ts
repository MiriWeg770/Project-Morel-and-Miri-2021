import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletPublishedMealComponent } from './delet-published-meal.component';

describe('DeletPublishedMealComponent', () => {
  let component: DeletPublishedMealComponent;
  let fixture: ComponentFixture<DeletPublishedMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletPublishedMealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletPublishedMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMealDetailsComponent } from './show-meal-details.component';

describe('ShowMealDetailsComponent', () => {
  let component: ShowMealDetailsComponent;
  let fixture: ComponentFixture<ShowMealDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMealDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMealDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

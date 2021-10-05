import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMonthsComponent } from './show-months.component';

describe('ShowMonthsComponent', () => {
  let component: ShowMonthsComponent;
  let fixture: ComponentFixture<ShowMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

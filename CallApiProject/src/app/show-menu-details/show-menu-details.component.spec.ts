import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMenuDetailsComponent } from './show-menu-details.component';

describe('ShowMenuDetailsComponent', () => {
  let component: ShowMenuDetailsComponent;
  let fixture: ComponentFixture<ShowMenuDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowMenuDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowMenuDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

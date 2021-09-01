import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePeopleComponent } from './change-people.component';

describe('ChangePeopleComponent', () => {
  let component: ChangePeopleComponent;
  let fixture: ComponentFixture<ChangePeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePeopleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

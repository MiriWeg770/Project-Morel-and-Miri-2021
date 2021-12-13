import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEntryComponent } from './manager-entry.component';

describe('ManagerEntryComponent', () => {
  let component: ManagerEntryComponent;
  let fixture: ComponentFixture<ManagerEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

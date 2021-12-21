import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletUnitComponent } from './delet-unit.component';

describe('DeletUnitComponent', () => {
  let component: DeletUnitComponent;
  let fixture: ComponentFixture<DeletUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

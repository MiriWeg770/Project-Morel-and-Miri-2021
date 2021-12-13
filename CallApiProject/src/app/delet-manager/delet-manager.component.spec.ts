import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletManagerComponent } from './delet-manager.component';

describe('DeletManagerComponent', () => {
  let component: DeletManagerComponent;
  let fixture: ComponentFixture<DeletManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

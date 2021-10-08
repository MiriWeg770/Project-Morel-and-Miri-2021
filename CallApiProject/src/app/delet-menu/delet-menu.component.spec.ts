import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletMenuComponent } from './delet-menu.component';

describe('DeletMenuComponent', () => {
  let component: DeletMenuComponent;
  let fixture: ComponentFixture<DeletMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

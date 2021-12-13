import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletUserComponent } from './delet-user.component';

describe('DeletUserComponent', () => {
  let component: DeletUserComponent;
  let fixture: ComponentFixture<DeletUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

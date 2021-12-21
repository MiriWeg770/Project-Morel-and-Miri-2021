import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletCategoryComponent } from './delet-category.component';

describe('DeletCategoryComponent', () => {
  let component: DeletCategoryComponent;
  let fixture: ComponentFixture<DeletCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

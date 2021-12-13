import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletPublishedMenuComponent } from './delet-published-menu.component';

describe('DeletPublishedMenuComponent', () => {
  let component: DeletPublishedMenuComponent;
  let fixture: ComponentFixture<DeletPublishedMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletPublishedMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletPublishedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

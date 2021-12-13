import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintMenuComponent } from './print-menu.component';

describe('PrintMenuComponent', () => {
  let component: PrintMenuComponent;
  let fixture: ComponentFixture<PrintMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

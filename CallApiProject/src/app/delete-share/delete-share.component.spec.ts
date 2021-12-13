import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteShareComponent } from './delete-share.component';

describe('DeleteShareComponent', () => {
  let component: DeleteShareComponent;
  let fixture: ComponentFixture<DeleteShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveShareToUpdateComponent } from './remove-share-to-update.component';

describe('RemoveShareToUpdateComponent', () => {
  let component: RemoveShareToUpdateComponent;
  let fixture: ComponentFixture<RemoveShareToUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveShareToUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveShareToUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

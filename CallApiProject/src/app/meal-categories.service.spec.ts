import { TestBed } from '@angular/core/testing';

import { MealCategoriesService } from './meal-categories.service';

describe('MealCategoriesService', () => {
  let service: MealCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

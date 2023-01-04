import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSafeImgComponent } from './error-safe-img.component';

describe('ErrorSafeImgComponent', () => {
  let component: ErrorSafeImgComponent;
  let fixture: ComponentFixture<ErrorSafeImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorSafeImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorSafeImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

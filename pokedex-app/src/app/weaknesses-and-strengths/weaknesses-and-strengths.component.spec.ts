import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaknessesAndStrengthsComponent } from './weaknesses-and-strengths.component';

describe('WeaknessesAndStrengthsComponent', () => {
  let component: WeaknessesAndStrengthsComponent;
  let fixture: ComponentFixture<WeaknessesAndStrengthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeaknessesAndStrengthsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeaknessesAndStrengthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

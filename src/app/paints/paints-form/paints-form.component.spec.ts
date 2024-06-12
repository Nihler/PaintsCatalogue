import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintsFormComponent } from './paints-form.component';

describe('PaintsFormComponent', () => {
  let component: PaintsFormComponent;
  let fixture: ComponentFixture<PaintsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaintsFormComponent]
    });
    fixture = TestBed.createComponent(PaintsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

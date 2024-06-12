import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaintsListComponent } from './paints-list.component';

describe('PaintsListComponent', () => {
  let component: PaintsListComponent;
  let fixture: ComponentFixture<PaintsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaintsListComponent]
    });
    fixture = TestBed.createComponent(PaintsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

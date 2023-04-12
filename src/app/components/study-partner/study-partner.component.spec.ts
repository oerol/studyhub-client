import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyPartnerComponent } from './study-partner.component';

describe('StudyPartnerComponent', () => {
  let component: StudyPartnerComponent;
  let fixture: ComponentFixture<StudyPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

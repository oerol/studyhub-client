import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamsOverviewComponent } from './exams-overview.component';

describe('ExamsOverviewComponent', () => {
  let component: ExamsOverviewComponent;
  let fixture: ComponentFixture<ExamsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamsOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExamsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

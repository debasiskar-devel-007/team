import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditTeamComponent } from './addedit-team.component';

describe('AddeditTeamComponent', () => {
  let component: AddeditTeamComponent;
  let fixture: ComponentFixture<AddeditTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddeditTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

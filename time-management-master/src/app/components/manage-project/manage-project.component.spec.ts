import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProjectComponent } from './manage-project.component';

describe('ManageProjectComponent', () => {
  let component: ManageProjectComponent;
  let fixture: ComponentFixture<ManageProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

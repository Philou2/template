import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleAddComponent } from './role-add.component';

describe('ParticipantAddEditComponent', () => {
  let component: RoleAddComponent;
  let fixture: ComponentFixture<RoleAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleAddComponent]
    });
    fixture = TestBed.createComponent(RoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAddComponent } from './user-add.component';

describe('ParticipantAddEditComponent', () => {
  let component: UserAddComponent;
  let fixture: ComponentFixture<UserAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserAddComponent]
    });
    fixture = TestBed.createComponent(UserAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

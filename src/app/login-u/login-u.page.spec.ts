import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUPage } from './login-u.page';

describe('LoginUPage', () => {
  let component: LoginUPage;
  let fixture: ComponentFixture<LoginUPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public isLoginPage: boolean;

  constructor() {
    this.isLoginPage = true;
  }

  handleLoginPress() {
    this.isLoginPage = true;
  }

  handleRegistrationPress() {
    this.isLoginPage = false;
  }
}

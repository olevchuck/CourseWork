import { Component, Input } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() appName: string = 'Application';

  public userLogin: string;

  constructor(private authService: AuthService) {
    this.userLogin = this.authService.getLogin();
    this.authService.getLoginObservable().subscribe(data=>{
      this.userLogin = data;
    });
  }

  logout() {
    this.authService.logout();
  }
}

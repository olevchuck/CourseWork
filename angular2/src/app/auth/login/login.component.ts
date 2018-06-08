import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

    constructor(private authService: AuthService) {}

    onSubmit(form: NgForm) {
      this.authService.login(form.value.login, form.value.password);
    }
}

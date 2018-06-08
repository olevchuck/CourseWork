import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent {
    constructor(private authService: AuthService) {}

    onSubmit(form: NgForm) {
      this.authService.register(form.value.login, form.value.password);
    }
}

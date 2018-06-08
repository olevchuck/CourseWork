import {Injectable} from '@angular/core';
import {QueryService, DOMAIN} from './query.service';
import {CookieService} from 'angular2-cookie/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()

export class AuthService {
  private loginValue: string;
  private loginValueSubject: Subject<string>;

  constructor(private queryService: QueryService, private cookieService: CookieService, private router: Router) {
    this.loginValue = null;
    this.loginValueSubject = new Subject<string>();
    let session = this.cookieService.get('session');
    if (session) {
      let values = session.split(',');
      if (values[0]=="''" || values[1]=="'null'" || values[2]=="'null'") {
        this.router.navigate(['/auth']);
        return;
      }
      this.loginValue = values[0].slice(1,-1);
      this.loginValueSubject.next(this.loginValue);
    } else {
      this.router.navigate(['/auth']);
    }
  }

  public getLogin() {
    return this.loginValue;
  }

  public getLoginObservable() {
    return this.loginValueSubject.asObservable();
  }

  public logout() {
    this.cookieService.remove('session');
    this.loginValue = null;
    this.loginValueSubject.next(this.loginValue);
    this.router.navigate(['/auth']);
  }

  public register(login: string, password: string) {
    this.queryService.register(login, password).subscribe((value)=>{
      if (value.body === '1') {
        this.login(login, password);
      } else {
        alert('This login already exists')
      }
    }, (err)=>{
      alert('Server error');
      console.log(err);
    });
  }

  public login(login: string, password: string) {
    this.queryService.login(login, password).subscribe((value)=>{
      let values = value.body.split(',');
      if (values[0]=="''" || values[1]=="'null'" || values[2]=="'null'") {
        alert('Invalid credentinals');
        return;
      }
      let date = new Date(values[1].slice(1,-1));
      let options = {
        // domain: DOMAIN,
        expires: date.toUTCString()
      }
      let optionsLocal = {
        // domain: DOMAIN,
        expires: date.toUTCString()
      }
      this.loginValue = values[0].slice(1,-1);
      this.loginValueSubject.next(this.loginValue);
      this.cookieService.put('session', value.body, options);
      this.cookieService.put('session', value.body, optionsLocal);
      this.router.navigate(['/']);
    }, (err)=>{
      alert('Server error');
      console.log(err);
    });
  }
}

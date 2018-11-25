import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

const helper = new JwtHelperService();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  // unamePattern = '^[a-zA-Z]{2,}[^\s-]$';
  public passPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$';

  // form states
  loading = false;
  success = false;

  public timeZoneShift = 18000000;
  public dayMillis = 86400000;

  constructor(private lf: FormBuilder, private Auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  private setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  private getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  private getQueryParam(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  ngOnInit() {
    setTimeout(() => {
      const queryParam = decodeURIComponent(this.getQueryParam('alert', false));
      if (queryParam && queryParam !== '' && queryParam !== 'null') {
        this.snackBar.open(queryParam, 'Close');
        history.pushState(null, null, 'http://localhost/login');
      }
    }, 1500);
    this.loginForm = this.lf.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        // Validators.pattern(this.passPattern)
      ]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginInspector(event) {
    event.preventDefault();
    this.loading = true;

    const formval = this.loginForm.value;

    try {
      this.Auth.getUserDetails(formval.email, formval.password).subscribe(data => {
        try {
          if (!data.error) {
            const decodedToken = helper.decodeToken(data.message);
            let user = decodedToken.user;
            delete user.Password;
            this.setCookie('access_token', data.message, 1);
            this.setCookie('user', JSON.stringify(user), 1);
            this.Auth.setLoggedIn(true);
            this.router.navigate(['dashboard']);
          } else {
            window.alert(data.message);
            this.Auth.setLoggedIn(false);
            // this.router.navigate(['']);
          }
        } catch (ex) {
          window.alert(data.message);
        }
      });
    } catch (ex) {
      console.log('an error occured');
    }
  }

}
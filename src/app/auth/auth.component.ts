import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService,private router: Router) {
  }

  ngOnInit(): void {
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;
    if (this.isLogin) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe(restData => {
      console.log(restData)
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error => {
      console.log(error)
      this.error = 'An error occurred!'
      this.isLoading = false;
    });
    form.reset();
  }

}

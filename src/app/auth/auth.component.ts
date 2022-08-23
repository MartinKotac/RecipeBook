import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error: string = '';

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    this.isLoading=true;
    if (this.isLogin) {
      //todo
    } else {
      const email = form.value.email;
      const password = form.value.password;
      this.authService.signUp(email, password).subscribe(restData => {
        console.log(restData)
        this.isLoading = false;
      }, error => {
        console.log(error)
        this.error = 'An error occurred!'
        this.isLoading = false;
      });
    }
    form.reset();
  }

}

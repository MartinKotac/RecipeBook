import {Component, OnInit} from '@angular/core';
import {UserService} from "./exercise/users.service";
import {AuthService} from "./auth/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {
  }
  ngOnInit(): void {
  this.authService.autoLogin();
  }
}

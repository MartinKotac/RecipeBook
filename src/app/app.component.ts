import { Component } from '@angular/core';
import {UserService} from "./exercise/users.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent {

  loadedFeature!: string
  onNavigate(feature:string){
    this.loadedFeature=feature;
  }
}

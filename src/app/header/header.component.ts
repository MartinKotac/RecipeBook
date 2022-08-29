import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/services/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dataStorage.storeRecipes()
  }
  onFetchData(){
    this.dataStorage.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }

}

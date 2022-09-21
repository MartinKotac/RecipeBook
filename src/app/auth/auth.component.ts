import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {

  isLogin = true;
  isLoading = false;
  error: string = '';
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;

  constructor(private authService: AuthService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) {
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
      this.showErrorAlert(this.error)
      this.isLoading = false;
    });
    form.reset();
  }

  onHandleError() {
    // @ts-ignore
    this.error = null;
  }

  private showErrorAlert(message: string) {
    //const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.closeAlert.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }

  ngOnDestroy(): void {
    if (this.closeSub)
      this.closeSub.unsubscribe();
  }

}

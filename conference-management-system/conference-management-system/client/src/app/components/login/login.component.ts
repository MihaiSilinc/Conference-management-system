import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {triggerLogin} from "../../store/action/login-actions";
import {getLoggedInUser} from "../../store/selector/login-selectors";
import {Router} from "@angular/router";
import {RoutingConstants} from "../../util/routing-constants";

@Component({
  selector: 'cms-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(
    private builder: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.builder.group({
        username: ['',
          [
            Validators.required,
            Validators.pattern('([a-zA-Z0-9]+){1,}')
          ]],
        password: ['', [
          Validators.required,
          Validators.pattern('([a-zA-Z0-9]+){1,}')
        ]]
      }
    );
  }

  get username(): any {
    return this.loginForm.get('username');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  loginTriggered() {
    console.log(this.username.value, this.password.value);

    this.store.dispatch(triggerLogin({
      credentials: {
        username: this.username.value,
        password: this.password.value
      }
    }));
  }

  register() {
    this.router.navigate([RoutingConstants.REGISTER]);
  }
}

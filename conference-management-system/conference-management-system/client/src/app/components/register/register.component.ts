import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {triggerRegister} from "../../store/action/register-actions";
import {getRegisterErrorMessage} from "../../store/selector/register-selectors";
import {UserDto} from "../../../api";
import UserTypeEnum = UserDto.UserTypeEnum;
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'cms-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  private sub: Subscription;
  error$: Observable<string>;
  destroyed$ = new Subject();

  constructor(
    private builder: FormBuilder,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.initForm();

    this.error$ = this.store.select(getRegisterErrorMessage);
  }

  private initForm() {
    this.registerForm = this.builder.group({
      username: ['', [
        Validators.required,
        Validators.pattern('([a-zA-Z0-9]+){5,}')
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('([a-zA-Z0-9]+){5,}')
      ]],
      confirmPassword: ['', [
        Validators.required,
        RegisterComponent.matchValues("password")
      ]],
      firstName: ['', [
        Validators.required
      ]],
      lastName: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      userType: ['AUTHOR', Validators.required],
      webPage: ['', [RegisterComponent.onlyRequiredForPCMember()]],
      affiliation: ['', RegisterComponent.onlyRequiredForPCMember()]
    });
    this.registerForm.controls.password.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(() => this.registerForm.controls.confirmPassword.updateValueAndValidity())
    ).subscribe();
    this.registerForm.controls.userType.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap(() => {
        this.registerForm.controls.webPage.updateValueAndValidity();
        this.registerForm.controls.affiliation.updateValueAndValidity();
      })
    ).subscribe();
  }

  public static onlyRequiredForPCMember(): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent && !!control.parent.value &&
        (control.parent.controls['userType'].value !== 'PCMEMBER' || !!control.value)?
        null: {isPresent: false};
    }
  }

  public static matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null : {isMatching: false};
    };
  }

  get username(): any {
    return this.registerForm.get('username');
  }

  get password(): any {
    return this.registerForm.get('password');
  }

  get confirmPassword(): any {
    return this.registerForm.get('confirmPassword');
  }

  get firstName(): any {
    return this.registerForm.get('firstName');
  }

  get lastName(): any {
    return this.registerForm.get('lastName');
  }

  get email(): any {
    return this.registerForm.get('email');
  }

  get webPage(): any {
    return this.registerForm.get('webPage');
  }

  get affiliation(): any {
    return this.registerForm.get('affiliation');
  }

  get userType(): any {
    return this.registerForm.get('userType');
  }

  registerTrigger() {
    this.store.dispatch(triggerRegister({
      userDto: {
        username: this.username.value,
        password: this.password.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        affiliation: this.affiliation?.value,
        emailAddress: this.email.value,
        webPage: this.webPage?.value,
        userType: this.userType.value
      }
    }));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}

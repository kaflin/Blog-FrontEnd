import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {RegisterService} from './register.service';
import {EMAIL_ALREADY_USED_TYPE} from '../shared/error.constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('username', { static: false })
  username?: ElementRef;

  success = false;
  error = false;
  doNotMatch = false;
  errorEmailExists = false;
  errorUserExists = false;
  registerForm =this.fb.group(
    {
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
          Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),

        ],
      ],
      // username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(254), Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    }
  );



  constructor( private fb: FormBuilder,
               private registerService: RegisterService) { }

  ngOnInit(): void {
    if (this.username) {
      this.username.nativeElement.focus();

    }
  }

  register(): void {
    this.doNotMatch = false;
    this.error = false;
    this.errorEmailExists = false;
    this.errorUserExists = false;
    const password = this.registerForm.get(['password'])!.value;
    if (password !== this.registerForm.get(['confirmPassword'])!.value) {
      this.doNotMatch = true;
    } else {
      const username = this.registerForm.get(['username'])!.value;
      const email = this.registerForm.get(['email'])!.value;
      this.registerService.signup({ username, email, password }).subscribe(
        () => (this.success = true),
        response => this.processError(response)
      );
    }
  }


  private processError(response: HttpErrorResponse): void {
    if (response.status === 400 ) {
      this.errorUserExists = true;
    }
    else if (response.status === 500) {
      this.errorEmailExists = true;
    }
    else {
      this.error = true;
    }
  }

  // openLogin() {
  //
  // }
}


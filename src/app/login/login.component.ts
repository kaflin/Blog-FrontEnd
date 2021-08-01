import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from '../Model/Login-request.payload';
import {AuthService} from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username', { static: false })
  username?: ElementRef;
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;

  // constructor(private fb: FormBuilder) { }
  constructor(private authService: AuthService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
  }




  // loginForm = this.fb.group(
  //   {
  //     username: [
  //       '',
  //       [
  //         Validators.required,
  //         Validators.minLength(1),
  //         Validators.maxLength(50),
  //         Validators.pattern('^[a-zA-Z0-9!$&*+=?^_`{|}~.-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$|^[_.@A-Za-z0-9-]+$'),
  //
  //       ],
  //   ],
  //     password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
  //
  //   });

  ngOnInit(): void {
    this.loginForm = new FormGroup(
      {
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
      });
  }
 login(): void{

   this.loginRequestPayload.username = this.loginForm.get('username')?.value;
   this.loginRequestPayload.password = this.loginForm.get('password')?.value;

   this.authService.login(this.loginRequestPayload).subscribe(data =>
    {
      console.log('Login successful');
    });
}


}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth1Service } from '../../services/auth1.service';
import { HttpErrorResponse } from '@angular/common/http/src/response';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../user-style.scss']
})
export class SignInComponent implements OnInit {
  userForm: FormGroup;
  message: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: Auth1Service
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get userEmail() {
    return this.userForm.get('userEmail');
  }
  get password() {
    return this.userForm.get('password');
  }

  signin() {
    const loginForm = {
      email: this.userEmail.value,
      password: this.password.value
    };
    console.log('[payload]', loginForm);
    this.auth.signin(loginForm)
      .subscribe(
      () => this.router.navigate(['profile']),
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // 클라이언트 또는 네트워크 에러
          console.log(`Client-side error : ${err.error.message}`);
        } else {
          // 백엔드가 실패 상태 코드 응답
          console.log(`Server-side error : ${err.status}`);
        }
      }
      );
  }

}
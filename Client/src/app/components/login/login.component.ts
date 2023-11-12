import { Component, OnInit } from '@angular/core';
import {LoginDTO} from "../../model/models.model";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {HttpServiceService} from "../../service/http-service.service";
import {UserServiceService} from "../../service/user-service.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loginUser: LoginDTO;
  wrong: number = 0;
  token: string|undefined;

  constructor(private router: Router, private fb: FormBuilder, private webService: HttpServiceService,
              private userService: UserServiceService) {}

  ngOnInit(): void {
    this.loginUser = new LoginDTO()
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]]
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.logout()
      this.loginUser.username = this.username?.value
      this.loginUser.password = this.password?.value
      this.webService.post('users/login', this.loginUser)
        .subscribe({
          next: res => {
            this.userService.loginUser(res)
            this.wrong = 0
            this.router.navigate(['home'])
          },
          error: error => {
            if(error.status == 401 || error.status == 404){
              this.wrong++;
              this.token = undefined
            }
          }
        })
    }
  }

  redirectToRegistration() {
    this.router.navigate(['register'])
  }
}

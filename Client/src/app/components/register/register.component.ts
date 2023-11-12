import { Component, OnInit} from '@angular/core';
import {RegDTO} from "../../model/models.model";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpServiceService} from "../../service/http-service.service";
import {debounceTime, distinctUntilChanged, subscribeOn, switchMap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup;
  registrationUser: RegDTO;
  usernameIsFree: Boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private webService: HttpServiceService) {}

  ngOnInit(): void {
    this.registrationUser = new RegDTO()
    this.initRegistrationForm();
    this.subscribeToUsernameChanges();
  }

  register() {
    if (this.registrationForm.valid && this.usernameIsFree) {
      this.registrationUser.name = this.name?.value
      this.registrationUser.username = this.username?.value
      this.registrationUser.password = this.password?.value
      this.registrationUser.role = this.role?.value
      this.webService.post('users/register', this.registrationUser)
        .subscribe({
          next: () =>
            this.router.navigate(['login']),
          error: error => {
            if(error.status == 200){
              this.router.navigate(['login'])
            }
          }
        })
    }
  }

  goBack() {
      this.router.navigate(['login'])
  }

  private initRegistrationForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(40)]],
      role: ['', [Validators.required]]
    });
  }

  // Getter for easy access to form controls
  get name() {
    return this.registrationForm.get('name');
  }

  get username() {
    return this.registrationForm.get('username');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get role() {
    return this.registrationForm.get('role');
  }

  subscribeToUsernameChanges(): void {
    this.registrationForm.get('username')?.valueChanges
      .pipe(
        debounceTime(300), // wait for 300ms pause in events
        distinctUntilChanged(), // ignore if value is unchanged
        switchMap(value => this.webService.get(`users/checkName/${value}`))
      )
      .subscribe({
        next: (res: boolean) => {
          this.usernameIsFree = !res;
        },
        error: error => {
          console.error('Error checking username availability:', error);
        }
      })
  }
}

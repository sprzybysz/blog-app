import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeComService } from '../services/home-com.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  isValidUser: boolean = true;
  isEmpty: boolean = false;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, ])
  });

  ngOnInit(): void {
    this.authService.fetchAllUsers()
  }

  handleLogin(): void {
    let formValue = this.loginForm.controls['userName'].value;
    this.authService.authenticateUser(formValue)

    if(this.authService.isUserLoggedIn()) {
      this.router.navigate(['/home'])
    } else {
      this.isEmpty = this.loginForm.controls['userName'].hasError('required');
      this.isValidUser = false;
    }
  }
}

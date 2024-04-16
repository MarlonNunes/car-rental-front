import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef;

  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService
    ){

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    document.body.classList.add('login-background');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('login-background');
  }

  clearFormAndFocusInEmail(): void{
    this.loginForm.reset();
    if (this.emailInput) {
      this.emailInput.nativeElement.focus();
    }
  }
  onSubmit(): void {
    if(this.loading){
      return;
    }    
    if(!this.loginForm.valid){
      alert("invalido");
      return;
    }

    const {email, password} = this.loginForm.value; 

    this.loading = true;
    this.authService.login(email, password).subscribe({
      next: (value) => {
        this.loading = false;
        this.router.navigateByUrl("/home");
      },
      error: (error) => {
        console.error(error);
        if(error.status == 401){
          this.toastr.warning("E-mail e/ou senha inválidos");
        }else{
          this.toastr.warning("Ocorreu um erro ao realizar o login");
        }
        this.clearFormAndFocusInEmail();
        this.loading = false;
      }
    });
  }
}

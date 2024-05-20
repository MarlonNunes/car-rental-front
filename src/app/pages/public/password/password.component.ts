import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserManagementService } from '../../../service/user-management.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { LoginService } from '../../../service/login.service';
import { CreatePasswordRequest } from '../../../model/login';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule, MatProgressSpinnerModule],
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss', '../login/login.component.scss']
})
export class PasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;

  readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly router: Router = inject(Router);
  readonly fb: FormBuilder = inject(FormBuilder);
  readonly toastr: ToastrService = inject(ToastrService);
  readonly loginService: LoginService = inject(LoginService);
  userId: number;
  code: string;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['user'];
      this.code = params['code']

      this.initForm();
    });

    
  }

  private initForm(): void{
    this.form = this.fb.group({
      userId: this.userId,
      verificationCode: this.code,
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }


  onSubmit(): void{
    if(!this.form.valid){
      this.form.markAllAsTouched();
    }

    if(this.getPassword != this.getConfirmPassword){
      this.toastr.error("Senhas não coincidem");
      return;
    }
    const req = this.form.value as CreatePasswordRequest;

    this.loginService.createPassword(req).subscribe({
      next: () => {
        this.toastr.success("Senha criada com sucesso!!");
        this.router.navigateByUrl("/login");
      }
    });
  }

  private get getPassword(): string{
    return this.form.get("password")?.value;
  }

  private get getConfirmPassword(): string{
    return this.form.get("confirmPassword")?.value;
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }
}

import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { cpfValidator } from '../../../../core/configs/Validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';
import { UserManagementService } from '../../../../service/user-management.service';
import { IdName } from '../../../../model/shared';
import { Role } from '../../../../model/admin';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [PageTitleComponent, ReactiveFormsModule, 
    MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatSelectModule, NgxMaskDirective],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  pageTitle: string = "Cadastro de usuário";
  
  form: FormGroup;
  loading: boolean;
  submit: boolean;
  rolesOptions: Role[];

  constructor(
    private fb: FormBuilder,
    private userService: UserManagementService,
    private router: Router
  ){
    this.initRoles();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      cpf: ['', cpfValidator()],
      email: ['', [Validators.email, Validators.required]],
      roleId: ['', [Validators.required]] 
    })
  }

  private initRoles(){
    this.loading = true;
    this.userService.getAllRoles().subscribe({
      next: resp => this.rolesOptions = resp,
      error: err => console.error(err)
    }).add(() => this.loading = false);
  }

  get firstName(){
    return this.form.get('firstName');
  }

  get email(){
    return this.form.get('email');
  }

  get cpf(){
    return this.form.get('cpf');
  }

  get roles(): FormArray{
    return this.form.get('roles') as FormArray;
  }

  onSubmit(){
    this.submit = true
    if(!this.form.valid){
      this.form.markAllAsTouched();
      return;
    }

    const request = this.form.value;

    this.loading = true;
    this.userService.saveUser(request).subscribe({
      next: value => this.router.navigateByUrl("users/list"),
      error: error => console.error(error)
    }).add(() => this.loading = false);
  }
}

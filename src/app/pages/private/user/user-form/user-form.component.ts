import { Component } from '@angular/core';
import { PageTitleComponent } from '../../../../core/components/page-title/page-title.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { cpfValidator } from '../../../../core/configs/Validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AdminService } from '../../../../service/admin.service';
import { IdName } from '../../../../model/shared';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [PageTitleComponent, ReactiveFormsModule, 
    MatProgressSpinnerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  pageTitle: string = "Cadastro de usuário";
  
  form: FormGroup;
  loading: boolean;
  submit: boolean;
  roles: IdName[];

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService
  ){
    this.initRoles();
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: [''],
      cpf: ['', cpfValidator()],
      email: ['', [Validators.email, Validators.required]],
      roles: this.fb.array([])
    })
  }

  private initRoles(){
    this.adminService.getAllRoles().subscribe(resp => {
      this.roles = resp;
    })
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

  onSubmit(){
    this.submit = true

  }
}

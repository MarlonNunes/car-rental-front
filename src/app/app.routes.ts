import { Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserListComponent } from './pages/private/user/user-list/user-list.component';
import { UserFormComponent } from './pages/private/user/user-form/user-form.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {
        path: 'users',
        canActivate: [AuthGuard],
        children: [
            {path: 'list', component: UserListComponent},
            {path: 'register', component: UserFormComponent}

        ]
    },
    // {
    //     path: 'admin', 
    //     canActivate: [AuthGuard],
    // }
];

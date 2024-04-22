import { Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { UserListComponent } from './pages/private/user/user-list/user-list.component';
import { UserFormComponent } from './pages/private/user/user-form/user-form.component';
import { LogoutComponent } from './pages/public/logout/logout.component';
import { StoreFormComponent } from './pages/private/store/store-form/store-form.component';
import { StoreListComponent } from './pages/private/store/store-list/store-list.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {
        path: 'admin', 
        canActivate: [AuthGuard],
        children: [
            {
                path: 'store',
                children: [
                    {path: 'register', component: StoreFormComponent},
                    {path: 'update/:id', component: StoreFormComponent},
                    {path: 'list', component: StoreListComponent}
                ]
            }
        ]
    },
    {
        path: 'users',
        canActivate: [AuthGuard],
        children: [
            {path: 'list', component: UserListComponent},
            {path: 'register', component: UserFormComponent}

        ]
    },
];

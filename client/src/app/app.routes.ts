import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Assignments } from './pages/assignments/assignments';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AddAssignment } from './pages/add-assignment/add-assignment';
import { EditAssignment } from './pages/edit-assignment/edit-assignment';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'assignments', component: Assignments },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'add-assignment', component: AddAssignment },
    { path: 'edit-assignment/:id', component: EditAssignment },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
];

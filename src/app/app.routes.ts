import { Routes } from '@angular/router';
import { MessageComponent } from './features/message/message.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LoginComponent } from './features/auth/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AuthGuard } from './Auth/auth.guard'; 
import { ForgotPasswordComponent } from './features/auth/forget-password/forget-password.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'register', component: RegisterComponent },
    {
      path:'home',
      canActivate: [AuthGuard],
      loadComponent:()=>
        import ('./features/home/home.component').then(x=>x.HomeComponent)
    },
    {
      path: 'profile',
      canActivate: [AuthGuard],
      loadComponent: () =>
        import('./features/profile/profile.component').then(m => m.ProfileComponent)
    },{
      path:'messages',
      canActivate:[AuthGuard],
      loadComponent : ()=>
        import('./features/message/message.component').then(m => m.MessageComponent)
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
  ];
  

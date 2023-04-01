import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const titleAppendix = " @studyhub"

const routes: Routes = [
  { path: '', component: HomeComponent, title: "home" + titleAppendix },
  { path: 'login', component: LoginComponent, title: "login" + titleAppendix },
  { path: 'register', component: RegisterComponent, title: "register" + titleAppendix },
  { path: 'dashboard', component: DashboardComponent, title: "dashboard" + titleAppendix }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

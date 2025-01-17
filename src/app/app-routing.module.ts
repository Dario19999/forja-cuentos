import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TaleListComponent } from './pages/tale-list/tale-list.component';
import { CreateTaleFormComponent } from './components/create-tale-form/create-tale-form.component';
import { TaleForgeComponent } from './pages/tale-forge/tale-forge.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/forms/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/login/register-form/register-form.component';
import { NarratorListComponent } from './pages/narrator-list/narrator-list.component';
import { NarratorFormComponent } from './components/forms/narrator/narrator-form/narrator-form.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    children: [
        { path: '', component: LoginFormComponent },
        { path: 'register', component: RegisterFormComponent }
    ]
  },
  {
    path: 'create-tale',
    component: TaleForgeComponent,
    children: [
        { path: '', component: CreateTaleFormComponent }
    ]
  },
  {
    path: 'tale-list',
    component: TaleListComponent
  },
  {
    path: 'narrator-list',
    component: NarratorListComponent
  },
  {
    path: 'create-narrator',
    component: NarratorFormComponent,
  },
  {
    path: 'create-character',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { TaleListComponent } from './pages/tale-list/tale-list.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/forms/login/login-form/login-form.component';
import { RegisterFormComponent } from './components/forms/login/register-form/register-form.component';
import { NarratorListComponent } from './pages/narrator-list/narrator-list.component';
import { NarratorFormComponent } from './components/forms/narrator/narrator-form/narrator-form.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterFormComponent } from './components/forms/character/character-form/character-form.component';
import { TaleFormComponent } from './components/forms/tale/tale-form/tale-form.component';
import { ViewTaleComponent } from './pages/view-tale/view-tale.component';
import { authGuard } from './core/guards/auth.guard';
import { UserAccountComponent } from './pages/user-account/user-account.component';

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
    component: TaleFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'tale-list',
    component: TaleListComponent,
    canActivate: [authGuard]

  },
  {
    path: 'tale/:id',
    component: ViewTaleComponent,
    canActivate: [authGuard]
  },
  {
    path: 'narrator-list',
    component: NarratorListComponent,
    canActivate: [authGuard]

  },
  {
    path: 'create-narrator',
    component: NarratorFormComponent,
    canActivate: [authGuard]

  },
  {
    path: 'character-list',
    component: CharacterListComponent,
    canActivate: [authGuard]

  },
  {
    path: 'create-character',
    component: CharacterFormComponent,
    canActivate: [authGuard]
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

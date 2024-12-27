import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ButtonComponent } from './components/common/button/button.component';
import { HomeComponent } from './pages/home/home.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TaleListComponent } from './pages/tale-list/tale-list.component';
import { CreateTaleFormComponent } from './components/create-tale-form/create-tale-form.component';
import { TaleForgeComponent } from './pages/tale-forge/tale-forge.component';
import { RegisterFormComponent } from './components/forms/login/register-form/register-form.component';
import { LoginFormComponent } from './components/forms/login/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    MainMenuComponent,
    TaleListComponent,
    CreateTaleFormComponent,
    TaleForgeComponent,
    LoginComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

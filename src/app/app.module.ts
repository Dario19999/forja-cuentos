import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TaleListComponent } from './pages/tale-list/tale-list.component';
import { CreateTaleFormComponent } from './components/create-tale-form/create-tale-form.component';
import { TaleForgeComponent } from './pages/tale-forge/tale-forge.component';
import { RegisterFormComponent } from './components/forms/login/register-form/register-form.component';
import { LoginFormComponent } from './components/forms/login/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NarratorListComponent } from './pages/narrator-list/narrator-list.component';
import { NarratorListItemComponent } from './components/narrator/narrator-list-item/narrator-list-item.component';
import { NarratorFormComponent } from './components/forms/narrator/narrator-form/narrator-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    TaleListComponent,
    CreateTaleFormComponent,
    TaleForgeComponent,
    LoginComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NarratorListComponent,
    NarratorListItemComponent,
    NarratorFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

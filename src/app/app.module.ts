import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TaleListComponent } from './pages/tale-list/tale-list.component';
import { RegisterFormComponent } from './components/forms/login/register-form/register-form.component';
import { LoginFormComponent } from './components/forms/login/login-form/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NarratorListComponent } from './pages/narrator-list/narrator-list.component';
import { NarratorListItemComponent } from './components/narrator/narrator-list-item/narrator-list-item.component';
import { NarratorFormComponent } from './components/forms/narrator/narrator-form/narrator-form.component';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterListItemComponent } from './components/character/character-list-item/character-list-item.component';
import { CharacterFormComponent } from './components/forms/character/character-form/character-form.component';
import { TaleListItemComponent } from './components/tale/tale-list-item/tale-list-item.component';
import { TaleFormComponent } from './components/forms/tale/tale-form/tale-form.component';
import { ViewTaleComponent } from './pages/view-tale/view-tale.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { UserAccountComponent } from './pages/user-account/user-account.component';
import { InfoTooltipComponent } from './components/common/info-tooltip/info-tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainMenuComponent,
    TaleListComponent,
    LoginComponent,
    RegisterFormComponent,
    LoginFormComponent,
    NarratorListComponent,
    NarratorListItemComponent,
    NarratorFormComponent,
    CharacterListComponent,
    CharacterListItemComponent,
    CharacterFormComponent,
    TaleListItemComponent,
    TaleFormComponent,
    ViewTaleComponent,
    UserAccountComponent,
    InfoTooltipComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

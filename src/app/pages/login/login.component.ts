import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <div class="form--content">
        <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
        <div class="login--layout">
            <div class="login--content">
                <div class="login--form">
                    <router-outlet></router-outlet>
                </div>
            </div>
        </div>
  `,
  styleUrl: './login.component.css'
})
export class LoginComponent {

}

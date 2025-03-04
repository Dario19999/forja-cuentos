import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

    optionList: any[] = [];

    defaultTheme: string = 'text-white border-white-800 bg-gray-500 bg-opacity-50 hover:bg-gray-200 hover:text-black focus:ring-white-300 shadow-md shadow-gray-500/50';

    constructor(
        private readonly authService: AuthService
    ) {
        authService.currentUser.subscribe( user => {
            if(user){
                this.optionList = [
                    {
                        title: 'Cuenta',
                        theme: 'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2',
                        redirectTo: '/user-account',
                    },
                    {
                        title: 'Lista de Cuentos',
                        theme: this.defaultTheme,
                        redirectTo: '/tale-list',
                    },
                    {
                        title: 'Lista de Narradores',
                        theme: this.defaultTheme,
                        redirectTo: '/narrator-list',
                    },
                    {
                        title: 'Lista de Personajes',
                        theme: this.defaultTheme,
                        redirectTo: '/character-list',
                    },
                    {
                        title: 'Logout',
                        theme: 'text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900',
                        redirectTo: '/login',
                    }
                ]
            }
            else{
                this.optionList = [
                    {
                        title: 'Login',
                        theme: 'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2',
                        redirectTo: '/login',
                    },
                ]
            }
        });
    }

    onOptionSelect(option:string): void {
        let body = document.querySelector('.app--background-layout');
        body?.classList.toggle('menuToggle');
        if(option === 'Logout'){
            this.authService.logout();
        }
    }
}

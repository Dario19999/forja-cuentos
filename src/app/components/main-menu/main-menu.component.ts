import { Component } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {

    optionList: any[];

    defaultTheme: string = 'text-white border-white-800 bg-gray-500 bg-opacity-50 hover:bg-gray-200 hover:text-black focus:ring-white-300 shadow-md shadow-gray-500/50';

    constructor() {
        this.optionList = [
            {
                title: 'Login',
                theme: 'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2',
                redirectTo: '/login',
            },
            {
                title: 'Crear Cuento',
                theme: this.defaultTheme,
                redirectTo: '/create-tale',
            },
            {
                title: 'Crear Narrador',
                theme: this.defaultTheme,
                redirectTo: '/create-narrator',
            },
            {
                title: 'Crear Personaje',
                theme: this.defaultTheme,
                redirectTo: '/create-character',
            },
            {
                title: 'Lista de Cuentos',
                theme: this.defaultTheme,
                redirectTo: '/tale-list',
            },
            {
                title: 'Salir',
                theme: this.defaultTheme
            }
        ]
    }

    onOptionSelect() {
        let body = document.querySelector('.app--background-layout');
        body?.classList.toggle('menuToggle');
    }
}

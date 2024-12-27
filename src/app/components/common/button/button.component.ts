import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-button',
    template: `
        <button routerLink="{{buttonRedirect.path}}" type="{{config.type ? config.type : 'button'}}" class="w-52 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-12 py-3.5 text-center me-2 mb-2 {{this.buttonClass}}">
            {{ config.text }}
        </button>
    `,
    styleUrl: './button.component.css',
})
export class ButtonComponent implements OnInit {
    @Input() config: any;
    buttonTheme: string;
    buttonClass: string;
    buttonRedirect: any;

    constructor() {
        this.buttonTheme = '';
        this.buttonClass = '';
        this.buttonRedirect = {};
    }

    ngOnInit() {
        console.log(this.config);
        this.buttonRedirect = this.config.redirectTo
            ? this.config.redirectTo
            : '';
        this.buttonTheme = this.validateTheme(this.config.theme);
        this.setButtonClass(this.buttonTheme);
    }

    validateTheme(theme: string) {
        return theme || 'default';
    }

    setButtonClass(theme: string) {
        switch (theme) {
            case 'default':
                this.buttonClass =
                    'text-white border-white-800 bg-gray-500 bg-opacity-50 hover:bg-gray-200 hover:text-black focus:ring-white-300 shadow-md shadow-gray-500/50';
                break;
            case 'purple-blue':
                this.buttonClass =
                    'text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2';
                break;
            case 'cyan-blue':
                this.buttonClass =
                    'text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2';
                break;
            case 'green-blue':
                this.buttonClass =
                    'text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2';
                break;
            case 'pink-orange':
                this.buttonClass =
                    'text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2';
                break;
        }
    }
}

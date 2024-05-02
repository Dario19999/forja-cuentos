import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent implements OnInit{
  @Input() config:any;
  buttonTheme:string;
  buttonClass:string;

  constructor() {
    this.buttonTheme = '';
    this.buttonClass = '';
  }

  ngOnInit() {
    console.log(this.config);
    this.buttonTheme = this.validateTheme(this.config.theme);
    this.setButtonClass(this.buttonTheme);
  }

  validateTheme(theme:string) {
    return theme ? theme : 'default';
  }

  setButtonClass(theme:string) {
    switch(theme) {
      case 'default':
        this.buttonClass = 'text-blue-800 border-blue-800 hover:bg-blue-800 focus:ring-blue-300 shadow-md shadow-blue-500/50';
        break;
      case 'dark':
        this.buttonClass = 'text-gray-900 border-gray-800 hover:bg-gray-900 focus:ring-gray-300 shadow-md shadow-gray-500/50';
        break;
      case 'green':
        this.buttonClass = 'text-green-700 border-green-700 hover:bg-green-800 focus:ring-green-300 shadow-md shadow-green-500/50';
        break;
      case 'red':
        this.buttonClass = 'text-red-700 border-red-700 hover:bg-red-800 focus:ring-red-300 shadow-md shadow-red-500/50';
        break;
      case 'purple':
        this.buttonClass = 'text-purple-700 border-purple-700 hover:bg-purple-800 focus:ring-purple-300 shadow-md shadow-purple-500/50';
        break;
      default:
        this.buttonClass = 'text-blue-700 border-blue-700 hover:bg-blue-800 focus:ring-blue-300 shadow-md shadow-blue-500/50';
        break;
    }
  }

}

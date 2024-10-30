import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        let logo = document.querySelector('.logo');
        let body = document.querySelector('.app--background-layout');
        let bodyWrapper = document.querySelector('.bodyWrapper');

        logo?.addEventListener('click', function () {
            body?.classList.toggle('menuToggle');
        });

        bodyWrapper?.addEventListener('click', function () {
            if (body?.classList.contains('menuToggle')) {
                body?.classList.remove('menuToggle');
            }
        });
    }
    title = 'forja-cuentos';
}

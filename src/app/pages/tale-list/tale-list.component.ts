import { Component } from '@angular/core';
import { TaleService } from '../../services/tale.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tale-list',
  template: `
    <div class="w-full">
        <ul class="w-100 text-bg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-y-auto" style="max-height: 75vh;">
            @for (tale of tales; track $index) {
                <li class="flex w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <app-tale-list-item [tale]="tale" (deletedTale)="deletedTale($event)"></app-tale-list-item>
                </li>
            }
        </ul>
        <div class="relative text-center m-5">
            <a
                routerLink="/create-tale"
                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
            >Crear Cuento Nuevo
            </a>
        </div>
    </div>
  `,
  styleUrl: './tale-list.component.css'
})
export class TaleListComponent {
    public tales: any[] = [];

    constructor(
        private readonly taleService: TaleService
    ) {
        this.loadTales();
    }

    loadTales(): void {
        this.tales = [];
        Swal.fire({
            allowOutsideClick: false
        });
        Swal.showLoading();
        this.taleService.getTales().subscribe({
            next: (talesData) => {
                Swal.close();
                this.tales = talesData;
            },
            error: (err) => {
                Swal.close();
                Swal.fire({
                    icon: 'error',
                    title: 'Error al cargar los cuentos',
                    text: err.error.message
                });
            }
        });
    }

    deletedTale(deleted: boolean): void {
        if(deleted){
            this.loadTales();
        }
    }
}

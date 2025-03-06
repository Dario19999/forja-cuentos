import { Component } from '@angular/core';
import { NarratorService } from '../../services/narrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-narrator-list',
  template: `
    <ul class="w-100 text-bg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        @for (narrator of narrators; track $index) {
            <li class="flex w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <app-narrator-list-item [narrator]="narrator" (deletedNarrator)="deletedNarrator($event)"></app-narrator-list-item>
            </li>
        }
    </ul>
    <div class="relative text-center m-5">
        <a
            routerLink="/create-narrator"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >Crear Narrador Nuevo
        </a>
    </div>
  `,
  styleUrl: './narrator-list.component.css'
})
export class NarratorListComponent {
    public narrators: any[] = [];

    constructor(
        private readonly narratorService: NarratorService,
    ) {
        this.loadNarrators();
    }

    loadNarrators(): void {
        Swal.fire({
            allowOutsideClick: false
        });
        Swal.showLoading();
        this.narratorService.getNarrators().subscribe({
            next: (narratorsData) => {
                Swal.close();
                this.narrators = narratorsData;
            }
        });
    }

    deletedNarrator(deleted: boolean): void {
        if(deleted){
            this.loadNarrators();
        }
    }
}

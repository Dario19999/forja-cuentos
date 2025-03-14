import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-list',
  template: `
    <ul class="w-100 text-bg font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-y-auto" style="max-height: 75vh;">
        @for (character of characters; track $index) {
            <li class="flex w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                <app-character-list-item [character]="character" (deletedCharacter)="deletedCharacter($event)"></app-character-list-item>
            </li>
        }
    </ul>
    <div class="relative text-center m-5">
        <a
            routerLink="/create-character"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >Crear Personaje Nuevo
        </a>
    </div>
  `,
  styleUrl: './character-list.component.css'
})
export class CharacterListComponent {
    public characters: any[] = [];

    constructor(
        private readonly characterService: CharacterService,
    ) {
        this.loadCharacters();
    }

    loadCharacters(): void {
        this.characters = [];
        Swal.fire({
            allowOutsideClick: false
        });
        Swal.showLoading();
        this.characterService.getCharacters().subscribe({
            next: (charactersData) => {
                Swal.close();
                this.characters = charactersData;
            }
        });
    }

    deletedCharacter(deleted: boolean): void {
        if(deleted){
            this.loadCharacters();
        }
    }

}

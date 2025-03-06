import { Component, effect, Input, OnInit, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CharacterService } from '../../../services/character.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-character-list-item',
  template: `
    <form
        [formGroup]="characterListItemForm"
    >
        <div class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    name="floating_character_name"
                    id="floating_character_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    formControlName="name"
                    required
                />
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="protagonista">Protagonista</option>
                    <option value="secundario">Secundario</option>
                    <option value="antagonista">Antagonista</option>
                </select>
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="7"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="role"
                    style="resize: none;"
                >
                </textarea>
            </div>
            <div class="relative z-0 w-full h-full group">

                @if(!toggleEdit()){
                    <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        (click)="toggleEdit.set(true)"
                    >Editar
                    </button>
                } @else {
                    <button
                        type="submit"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                        (click)="onSubmit(character.id)"
                        >Guardar
                    </button>
                }
                <button
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                    (click)="onDelete(character.id)"
                >Eliminar
                </button>
            </div>
        </div>
    </form>
  `,
  styleUrl: './character-list-item.component.css'
})
export class CharacterListItemComponent implements OnInit {
    characterListItemForm!: FormGroup;

    @Input()
    public character:any = {}

    public toggleEdit = signal<boolean>(false);

    private errorMessage: string = '';

    public deletedCharacter = output<boolean>();

    constructor(
        private readonly fb: FormBuilder,
        private readonly characterService: CharacterService,
    ) {
        effect(() => {
            if(this.toggleEdit()){
                this.characterListItemForm.get('name')?.enable();
                this.characterListItemForm.get('type')?.enable();
                this.characterListItemForm.get('role')?.enable();
            } else {
                this.characterListItemForm.get('name')?.disable();
                this.characterListItemForm.get('type')?.disable();
                this.characterListItemForm.get('role')?.disable();
            }
        });
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.characterListItemForm = this.fb.group({
            name: [{value: this.character.name, disabled: true}, [Validators.required, Validators.maxLength(100)]],
            type: [{value: this.character.type, disabled: true}, [Validators.required]],
            role: [{value: this.character.role, disabled: true}, [Validators.required]]
        });
    }

    onSubmit(characterId: number) {
        if (this.characterListItemForm.invalid) {
            Object.values(this.characterListItemForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Actualizando personaje...'
            });
            Swal.showLoading();

            this.characterService.updateCharacter(characterId, this.characterListItemForm.value).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        text: 'Personaje actualizado correctamente'
                    });
                    this.toggleEdit.set(false);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.errorMessage = 'Error: El personaje existe dentro de un cuento';
                    }
                    else {
                        this.errorMessage = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde';
                    }
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        text:  this.errorMessage
                    });
                }
            });

        }
    }

    onDelete(characterId: number) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Eliminando personaje...'
        });
        Swal.showLoading();

        this.characterService.removeCharacter(characterId).subscribe({
            next: () => {
                Swal.close();
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    confirmButtonText: "Ok",
                    text: 'Personaje eliminado correctamente'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.deletedCharacter.emit(true);
                    }
                });
            },
            error: (err) => {
                if (err.status === 409) {
                    this.errorMessage = 'Error: El personaje existe dentro de un cuento';
                }
                else {
                    this.errorMessage = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde';
                }
                Swal.close();
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    text:  this.errorMessage
                });
            }
        });
    }

    get invalidName() {
        return this.characterListItemForm.get('name')?.invalid && this.characterListItemForm.get('name')?.touched;
    }
    get invalidType() {
        return this.characterListItemForm.get('type')?.invalid && this.characterListItemForm.get('type')?.touched;
    }
    get invalidDescription() {
        return this.characterListItemForm.get('role')?.invalid && this.characterListItemForm.get('role')?.touched;
    }
}

import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-list-item',
  template: `
    <form
        [formGroup]="characterListItemForm"
        (ngSubmit)="onSubmit()"
    >
        <div class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    name="floating_character_name"
                    id="floating_character_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="characterName"
                    required
                />
                <label
                    for="floating_character_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre
                </label>
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="characterType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Tipo</option>
                </select>
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="characterDescription"
                    style="resize: none;"
                ></textarea>
            </div>
            <div class="relative z-0 w-full h-full group">
                <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Editar
                </button>
                <button
                    type="button"
                    class="hidden text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >Guardar
                </button>
                <button
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                >Eliminar
                </button>
            </div>
        </div>
    </form>
  `,
  styleUrl: './character-list-item.component.css'
})
export class CharacterListItemComponent {
    characterListItemForm!: FormGroup;

    constructor(
        private readonly fb: FormBuilder
    ) {
        this.formInit();
    }

    formInit() {
        this.characterListItemForm = this.fb.group({
            characterName: ['', Validators.required, Validators.maxLength(100)],
            characterType: ['', Validators.required],
            characterDescription: ['', Validators.required]
        });
    }

    onSubmit() {
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
            console.log(this.characterListItemForm.value);
        }
    }

    get invalidName() {
        return this.characterListItemForm.get('characterName')?.invalid && this.characterListItemForm.get('characterName')?.touched;
    }
    get invalidType() {
        return this.characterListItemForm.get('characterType')?.invalid && this.characterListItemForm.get('characterType')?.touched;
    }
    get invalidDescription() {
        return this.characterListItemForm.get('characterDescription')?.invalid && this.characterListItemForm.get('characterDescription')?.touched;
    }
}

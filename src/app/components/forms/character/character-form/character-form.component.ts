import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-form',
  template: `
    <div class="form--content">
        <form
            [formGroup]="characterForm"
            (ngSubmit)="onSubmit()"
            class="characterForm max-w-md mx-auto"
        >
            <div class="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="characterName"
                    id="characterName"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="characterName"
                    required
                />
                <label
                    for="characterName"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre de Personaje
                </label>
                <div *ngIf="invalidName" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="characterForm.get('characterName')?.errors?.['required']">El nombre es requerido</span>
                    <span *ngIf="characterForm.get('characterName')?.errors?.['maxlength']">El nombre no puede exceder los 30 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="characterType">Tipo de Personaje</label>
                <select
                    id="characterType"
                    formControlName="characterType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Protagonista</option>
                    <option>Antagonista</option>
                    <option>Secundario</option>
                </select>
                <div *ngIf="invalidType" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="characterForm.get('characterType')?.errors?.['required']">El tipo de personaje es requerido</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="characterDescription">Descripcion del Personaje</label>
                <textarea
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="characterDescription"
                    style="resize: none;"
                ></textarea>
                <div *ngIf="invalidDescription" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="characterForm.get('characterDescription')?.errors?.['required']">La voz es requerida</span>
                </div>
            </div>
            <div class="relative z-0 w-full group m-3 text-center">
                <button
                    type="submit"
                    class="w-52 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-12 py-3.5 text-center me-2 mb-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    >Crear Personaje
                </button>
            </div>
        </form>
    </div>
  `,
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent {
    characterForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder
    ){
        this.formInit();
    }

    formInit(): void {
        this.characterForm = this.formBuilder.group({
            characterName: ['', [Validators.required, Validators.maxLength(30)]],
            characterType: ['', [Validators.required]],
            characterDescription: ['', [Validators.required]],
        });
    }

    onSubmit() {
        if (this.characterForm.invalid) {
            Object.values(this.characterForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            console.log(this.characterForm.value);
        }
    }

    get invalidName() {
        return this.characterForm.get('characterName')?.invalid && this.characterForm.get('characterName')?.touched;
    }
    get invalidType() {
        return this.characterForm.get('characterType')?.invalid && this.characterForm.get('characterType')?.touched;
    }
    get invalidDescription() {
        return this.characterForm.get('characterDescription')?.invalid && this.characterForm.get('characterDescription')?.touched;
    }
}

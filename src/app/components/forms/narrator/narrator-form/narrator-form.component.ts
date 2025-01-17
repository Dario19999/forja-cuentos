import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-narrator-form',
  template: `
    <div class="form--content">
        <form
            [formGroup]="narratorForm"
            (ngSubmit)="onSubmit()"
            class="narratorForm max-w-md mx-auto"
        >
            <div class="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="narratorName"
                    id="narratorName"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="narratorName"
                    required
                />
                <label
                    for="narratorName"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre de Narrador
                </label>
                <div *ngIf="invalidName" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('narratorName')?.errors?.['required']">El nombre es requerido</span>
                    <span *ngIf="narratorForm.get('narratorName')?.errors?.['maxlength']">El nombre no puede exceder los 30 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="narratorType">Tipo de Narrador</label>
                <select
                    id="narratorType"
                    formControlName="narratorType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Tipo</option>
                </select>
                <div *ngIf="invalidType" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('narratorType')?.errors?.['required']">El tipo de narrador es requerido</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="narratorVoice">Voz de Narrador</label>
                <select
                    id="narratorVoice"
                    formControlName="narratorVoice"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Voz</option>
                </select>
                <div *ngIf="invalidVoice" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('narratorVoice')?.errors?.['required']">La voz es requerida</span>
                </div>
            </div>
            <div class="relative z-0 w-full group m-3 text-center">
                <button
                    type="submit"
                    class="w-52 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-12 py-3.5 text-center me-2 mb-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    >Crear Narrador
                </button>
            </div>
        </form>
    </div>
  `,
  styleUrl: './narrator-form.component.css'
})
export class NarratorFormComponent {

    narratorForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder
    ) {
        this.formInit();
    }

    formInit(): void {
        this.narratorForm = this.formBuilder.group({
            narratorName: ['', [Validators.required, Validators.maxLength(30)]],
            narratorType: ['', [Validators.required]],
            narratorVoice: ['', [Validators.required]],
        });
    }

    get invalidName(): boolean | undefined {
        return this.narratorForm.get('narratorName')?.invalid && this.narratorForm.get('narratorName')?.touched;
    }
    get invalidType(): boolean | undefined {
        return this.narratorForm.get('narratorType')?.invalid && this.narratorForm.get('narratorType')?.touched;
    }
    get invalidVoice(): boolean | undefined {
        return this.narratorForm.get('narratorVoice')?.invalid && this.narratorForm.get('narratorVoice')?.touched;
    }

    onSubmit(): void {
        if (this.narratorForm.invalid) {
            console.log('Formulario inválido');
            Object.values(this.narratorForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            console.log(this.narratorForm.value);
        }
    }
}

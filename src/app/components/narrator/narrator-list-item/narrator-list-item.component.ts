import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-narrator-list-item',
  template: `
    <form
        [formGroup]="narratorListItemForm"
        (ngSubmit)="onSubmit()"
    >
        <div class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="narratorName"
                    required
                />
                <label
                    for="floating_first_name"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre
                </label>
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="narratorType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Tipo</option>
                </select>
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="voice"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option>Voz</option>
                </select>
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
  styleUrl: './narrator-list-item.component.css'
})
export class NarratorListItemComponent {
    narratorListItemForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder
    ) {
        this.formInit();
    }

    formInit(): void {
        this.narratorListItemForm = this.formBuilder.group({
            narratorName: ['', [Validators.required, Validators.maxLength(30)]],
            narratorType: ['', [Validators.required]],
            voice: ['', [Validators.required]],
        });
    }

    get invalidName(): boolean | undefined {
        return this.narratorListItemForm.get('name')?.invalid && this.narratorListItemForm.get('name')?.touched;
    }
    get invalidNarratorType(): boolean | undefined {
        return this.narratorListItemForm.get('narratorType')?.invalid && this.narratorListItemForm.get('narratorType')?.touched;
    }
    get invalidVoice(): boolean | undefined {
        return this.narratorListItemForm.get('voice')?.invalid && this.narratorListItemForm.get('voice')?.touched;
    }

    onSubmit(): void {
        if (this.narratorListItemForm.invalid) {
            Object.values(this.narratorListItemForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            console.log(this.narratorListItemForm.value);
        }
    }
}

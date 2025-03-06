import { NarratorService } from './../../../../services/narrator.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
                    name="alias"
                    id="alias"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="alias"
                    required
                />
                <label
                    for="alias"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre de Narrador
                </label>
                <div *ngIf="invalidName" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('alias')?.errors?.['required']">El nombre es requerido</span>
                    <span *ngIf="narratorForm.get('alias')?.errors?.['maxlength']">El nombre no puede exceder los 30 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="type">Tipo de Narrador</label>
                <select
                    id="type"
                    formControlName="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    @for (type of typeList; track $index) {
                        <option value='{{ type.value }}'>{{ type.label }}</option>
                    }
                </select>
                <div *ngIf="invalidType" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('type')?.errors?.['required']">El tipo de narrador es requerido</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label for="voiceReference">Voz de Narrador</label>
                <select
                    id="voiceReference"
                    formControlName="voiceReference"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="female">Femenina</option>
                    <option value="male">Masculina</option>
                </select>
                <div *ngIf="invalidVoice" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="narratorForm.get('voiceReference')?.errors?.['required']">La voz es requerida</span>
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

    typeList = [
        { value: 'protagonista', label: 'Protagonista' },
        { value: 'observador', label: 'Observador' },
        { value: 'equisciente', label: 'Equisciente' },
        { value: 'multiple', label: 'Múltiple' },
        { value: 'omnisciente', label: 'Omnisciente' },
    ]

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly narratorService: NarratorService,
        private readonly router: Router
    ) {
        this.formInit();
    }

    formInit(): void {
        this.narratorForm = this.formBuilder.group({
            alias: ['', [Validators.required, Validators.maxLength(30)]],
            type: ['', [Validators.required]],
            voiceReference: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
 if (this.narratorForm.invalid) {
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
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Creando narrador...'
            });
            Swal.showLoading();

            this.narratorService.createNarrator(this.narratorForm.value).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        confirmButtonText: "Ok",
                        text: 'Narrador creado correctamente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.router.navigate(['/narrator-list']);
                        }
                    });
                },
                error: (err) => {
                    console.error(err);
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        text: 'Error en el servidor. Por favor, inténtalo de nuevo más tarde'
                    });
                }
            });

        }
    }

    get invalidName(): boolean | undefined {
        return this.narratorForm.get('alias')?.invalid && this.narratorForm.get('alias')?.touched;
    }
    get invalidType(): boolean | undefined {
        return this.narratorForm.get('type')?.invalid && this.narratorForm.get('type')?.touched;
    }
    get invalidVoice(): boolean | undefined {
        return this.narratorForm.get('voiceReference')?.invalid && this.narratorForm.get('voiceReference')?.touched;
    }

}

import { Component, effect, Input, OnInit, output, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NarratorService } from '../../../services/narrator.service';

@Component({
  selector: 'app-narrator-list-item',
  template: `
    <form
        [formGroup]="narratorListItemForm"
    >
        <div class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    name="floating_first_name"
                    id="floating_first_name"
                    class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    formControlName="alias"
                    required
                />
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="type"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    @for (type of typeList; track $index) {
                        <option value='{{ type.value }}'>{{ type.label }}</option>
                    }
                </select>
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="voiceReference"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="female">Femenina</option>
                    <option value="male">Masculina</option>
                </select>
            </div>
            <div class="relative z-0 w-full h-full group">
                @if(!toggleEdit()){
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="toggleEdit.set(true)"
                    >Editar
                    </button>
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onDelete(narrator.id)"
                    >Eliminar
                    </button>
                } @else {
                    <button
                        type="submit"
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onSubmit(narrator.id)"
                        >Guardar
                    </button>
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="toggleEdit.set(false)"
                    >Cancelar
                    </button>
                }

            </div>
        </div>
    </form>
  `,
  styleUrl: './narrator-list-item.component.css'
})
export class NarratorListItemComponent implements OnInit{
    narratorListItemForm!: FormGroup;

    @Input()
    public narrator: any = {};

    public deletedNarrator = output<boolean>();

    public typeList = [
        { value: 'protagonista', label: 'Protagonista' },
        { value: 'observador', label: 'Observador' },
        { value: 'equisciente', label: 'Equisciente' },
        { value: 'multiple', label: 'Múltiple' },
        { value: 'omnisciente', label: 'Omnisciente' },
    ]

    public toggleEdit = signal<boolean>(false);

    private errorMessage: string = '';

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly narratorService: NarratorService,
    ) {
        effect(() => {
            if(this.toggleEdit()){
                this.narratorListItemForm.get('alias')?.enable();
                this.narratorListItemForm.get('type')?.enable();
                this.narratorListItemForm.get('voiceReference')?.enable();
            } else {
                this.narratorListItemForm.get('alias')?.disable();
                this.narratorListItemForm.get('type')?.disable();
                this.narratorListItemForm.get('voiceReference')?.disable();
            }
        });
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit(): void {
        this.narratorListItemForm = this.formBuilder.group({
            alias: [{value: this.narrator.alias, disabled: true}, [Validators.required, Validators.maxLength(30)]],
            type: [{value: this.narrator.type, disabled: true}, [Validators.required]],
            voiceReference: [{value: this.narrator.voiceReference, disabled: true}, [Validators.required]],
        });
    }

    onSubmit(narratorId: number): void {
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
             Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Actualizando narrador...'
            });
            Swal.showLoading();

            this.narratorService.updateNarrator(narratorId, this.narratorListItemForm.value).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        text: 'Narrador actualizado correctamente'
                    });
                    this.toggleEdit.set(false);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.errorMessage = 'Error: El narrador existe dentro de un cuento';
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

    onDelete(narratorId: number) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: `Cancelar`,
            text: '¿Eliminar narrador?',
        }).then((result) => {
            if (result.isConfirmed) {
                this.narratorService.removeNarrator(narratorId).subscribe({
                    next: () => {
                        Swal.close();
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'success',
                            confirmButtonText: "Ok",
                            text: 'Narrador eliminado correctamente'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.deletedNarrator.emit(true);
                            }
                        });
                    },
                    error: (err) => {
                        if (err.status === 409) {
                            this.errorMessage = 'Error: El narrador existe dentro de un cuento';
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
        });


    }

    get invalidName(): boolean | undefined {
        return this.narratorListItemForm.get('name')?.invalid && this.narratorListItemForm.get('name')?.touched;
    }
    get invalidtype(): boolean | undefined {
        return this.narratorListItemForm.get('type')?.invalid && this.narratorListItemForm.get('type')?.touched;
    }
    get invalidvoiceReference(): boolean | undefined {
        return this.narratorListItemForm.get('voiceReference')?.invalid && this.narratorListItemForm.get('voiceReference')?.touched;
    }

}

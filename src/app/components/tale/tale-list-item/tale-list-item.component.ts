import { Component, effect, Input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaleService } from '../../../services/tale.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tale-list-item',
  template: `
   <form
        [formGroup]="taleListItemForm"
        enctype="multipart/form-data"
   >
        <div class="grid md:grid-cols-3 md:gap-6 mt-5 mb-5">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    formControlName="title"
                />
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full group">
                @if(toggleEdit()){
                    <div class="flex items-center justify-center w-full tale-image-input">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click para subir imagen</span> o drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
                            </div>
                            <input
                            id="dropzone-file"
                            type="file"
                            class="hidden"
                            (change)="onFileSelected($event)"
                            />

                        </label>
                    </div>
                } @else {
                    <img src="{{tale.imageUrl}}" alt="placeholder" width="400" height="220" class="tale-image object-cover"/>
                }
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="9"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style="resize: none;"
                    formControlName="synopsis"
                ></textarea>
            </div>
            <div class="flex flex-col z-0 w-full h-full group">
                @if(!toggleEdit()){
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        (click)="toggleEdit.set(true)"
                    >Editar
                    </button>
                } @else {
                    <button
                        type="submit"
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onSubmit(tale.id)"
                        >Guardar
                    </button>
                }
                @if (!toggleEdit()) {
                    <button
                        routerLink="/tale"
                        type="button"
                        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    >Reporducir
                    </button>
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onDelete(tale.id)"
                    >Eliminar
                    </button>
                }
                @if (toggleEdit()) {
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        (click)="toggleEdit.set(false)"
                    >Cancelar
                    </button>
                }

            </div>
        </div>
        @if (toggleEdit()) {
            <div class="grid md:grid-cols-1 mt-5 mb-5">
                <div class="relative z-0 w-full group">
                    <textarea
                        rows="15"
                        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        style="resize: none;"
                        formControlName="fullTale"
                    ></textarea>
                </div>
            </div>
        }
    </form>
  `,
  styleUrl: './tale-list-item.component.css'
})
export class TaleListItemComponent implements OnInit{

    public taleListItemForm!: FormGroup;
    private readonly taleFormData = new FormData();
    public selectedFile: File | null = null;




    @Input()
    public tale: any = {};
    public deletedTale = output<boolean>();
    public toggleEdit = signal<boolean>(false);


    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly taleService: TaleService
    ) {
        effect(() => {
            if(this.toggleEdit()){
                this.taleListItemForm.get('title')?.enable();
                this.taleListItemForm.get('synopsis')?.enable();
            } else {
                this.taleListItemForm.get('title')?.disable();
                this.taleListItemForm.get('synopsis')?.disable();
            }
        });
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit(): void {
        this.taleListItemForm = this.formBuilder.group({
            title: [{value: this.tale.title, disabled: true}],
            fullTale: [{value: this.tale.fullTale, disabled: true}],
            synopsis: [{value: this.tale.synopsis, disabled: true}],
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            this.selectedFile = file;
            this.taleFormData.append('taleImage', this.selectedFile!);
        }
    }


    onSubmit(taleId: number): void {
        if (this.taleListItemForm.invalid) {
            Object.values(this.taleListItemForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{

            this.taleFormData.append('taleTitle', this.taleListItemForm.get('title')?.value);
            this.taleFormData.append('taleSynopsis', this.taleListItemForm.get('synopsis')?.value);
            this.taleFormData.append('taleBody', this.taleListItemForm.get('fullTale')?.value);

            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Actualizando cuento...'
            });
            Swal.showLoading();

            this.taleService.updateTale(taleId, this.taleFormData).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        confirmButtonText: "Ok",
                        text: 'Cuento actualizado correctamente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.toggleEdit.set(false);
                        }
                    });
                },
                error: (err) => {
                    Swal.fire({
                        icon: 'error',
                        text: 'Error al actualizar cuento'
                    });
                }
            });
        }
    }

    onDelete(taleId: number) {
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: `Cancelar`,
            text: '¿Eliminar cuento?',
        }).then((result) => {
            if (result.isConfirmed) {
                this.taleService.removeTale(taleId).subscribe({
                    next: () => {
                        Swal.close();
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'success',
                            confirmButtonText: "Ok",
                            text: 'Cuento eliminado correctamente'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                this.deletedTale.emit(true);
                            }
                        });
                    },
                    error: (err) => {
                        Swal.close();
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'error',
                            text:  'Error al eliminar cuento'
                        });
                    }
                });
            }
        });


    }
}

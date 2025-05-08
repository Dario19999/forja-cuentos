import { Component, effect, Input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
                    class="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    formControlName="title"
                />
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full group">
                @if(toggleEdit()){
                    <div class="flex items-center justify-center w-full tale-image-input">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-25 w-100 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p class="mb-2 text-lg text-gray-500 dark:text-gray-400"><span class="font-semibold">Click para subir imagen</span> ó drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">PNG ó JPG</p>
                            </div>
                            <input
                                formControlName="taleImage"
                                id="dropzone-file"
                                type="file"
                                class="hidden"
                                (change)="onFileSelected($event)"
                                accept="image/png, image/jpg"
                            />
                        </label>
                    </div>
                } @else {
                    <div class="d-flex justify-content-center w-full">
                        <img
                            src="{{tale.imageUrl}}"
                            alt="placeholder"
                            width="400"
                            height="220"
                            [ngStyle]="{display: hasImageLoaded() ? 'block' : 'none'}"
                            class="tale-image object-cover w-full h-64 rounded-lg"
                            (load)="onLoad()"
                        />

                        @if (!hasImageLoaded()) {
                            <div class="w-full h-64 flex items-center justify-center" style="width: 400px; height: 220px;">
                                <img
                                    height="25"
                                    width="25"
                                    src="assets/svg/loaders/tail-spin.svg"
                                    alt="placeholder-spiner"
                                />
                            </div>
                        }
                    </div>
                }
                @if (toggleEdit() && taleListItemForm.get('taleImage')?.value && imageSrc) {
                    <div class="relative z-0 w-full group">
                        <div class="flex items-center justify-center w-full">
                            <img
                                [src]="imageSrc"
                                alt="taleImage"
                                class="w-full h-64 object-cover rounded-lg"
                            />
                        </div>
                    </div>
                }
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="9"
                    class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style="resize: none;"
                    formControlName="synopsis"
                ></textarea>
            </div>
            <div class="flex flex-col z-0 w-full h-full group">
                @if(!toggleEdit()){
                    <button
                        [routerLink]="['/tale', tale.id]"
                        type="button"
                        class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                    >Reproducir
                    </button>
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="toggleEdit.set(true)"
                    >Editar
                    </button>
                    <button
                        type="button"
                        class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onDelete(tale.id)"
                    >Eliminar
                    </button>
                } @else {
                    <button
                        type="submit"
                        class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-lg px-5 py-2.5 text-center me-2 mb-2"
                        (click)="onSubmit(tale.id)"
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
        @if (toggleEdit()) {
            <div class="grid md:grid-cols-1 mt-5 mb-5">
                <div class="relative z-0 w-full group">
                    <textarea
                        rows="15"
                        class="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    public imageSrc: string = '';

    @Input()
    public tale: any = {};
    public deletedTale = output<boolean>();
    public toggleEdit = signal<boolean>(false);

    public hasImageLoaded = signal<boolean>(false);


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
                this.taleListItemForm.get('taleImage')?.reset();
            }
        });
    }

    ngOnInit(): void {
        this.formInit();
    }

    formInit(): void {
        this.taleListItemForm = this.formBuilder.group({
            taleImage: ['', [Validators.required]],
            title: [{value: this.tale.title, disabled: true}, [Validators.required]],
            fullTale: [{value: this.tale.fullTale, disabled: true},  [Validators.required]],
            synopsis: [{value: this.tale.synopsis, disabled: true},  [Validators.required]],
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imageSrc = e.target.result;
            reader.readAsDataURL(file)
            this.taleFormData.append('taleImage', file);
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

    public onLoad(): void {
        setTimeout(() => {
          this.hasImageLoaded.set(true);
        }, 1300);
      }

    get invalidImage() {
        return this.taleListItemForm.get('taleImage')?.invalid && this.taleListItemForm.get('taleImage')?.touched
    }

    get invalidName() {
        return this.taleListItemForm.get('title')?.invalid && this.taleListItemForm.get('taleName')?.touched;
    }

    get invalidSynopsis() {
        return this.taleListItemForm.get('synopsis')?.invalid && this.taleListItemForm.get('synopsis')?.touched;
    }

    get invalidFullTale() {
        return this.taleListItemForm.get('fullTale')?.invalid && this.taleListItemForm.get('fullTale')?.touched;
    }


}

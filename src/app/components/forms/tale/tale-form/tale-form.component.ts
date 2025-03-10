import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { TaleService } from '../../../../services/tale.service';
import { CharacterService } from '../../../../services/character.service';
import { NarratorService } from '../../../../services/narrator.service';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tale-form',
  template: `
    <div class="form--content">
        <form
            [formGroup]="taleForm"
            (ngSubmit)="onSubmit()"
            class="taleForm max-w-md mx-auto"
        >
            <div class="relative z-0 w-full mb-5 group">
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                            </svg>
                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click para subir</span> o drag and drop</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
                        </div>
                        <input
                        formControlName="taleImage"
                        id="dropzone-file"
                        type="file"
                        class="hidden" />
                    </label>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <input
                    type="text"
                    name="taleName"
                    id="taleName"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    formControlName="taleName"
                    required
                />
                <label
                    for="taleName"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Nombre del Cuento
                </label>
                <div *ngIf="invalidName" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('taleName')?.errors?.['required']">El nombre es requerido</span>
                    <span *ngIf="taleForm.get('taleName')?.errors?.['maxlength']">El nombre no puede exceder los 30 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    for="taleGenre"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Género
                </label>
                <select
                    id="taleGenre"
                    formControlName="taleGenre"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    @for (genre of genreList; track $index) {
                        <option value='{{ genre.value }}'>{{ genre.label }}</option>
                    }
                </select>
                <div *ngIf="invalidGenre" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('taleGenre')?.errors?.['required']">El tipo de narrador es requerido</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    for="narrator"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Narrador
                </label>
                <select
                    id="narrator"
                    formControlName="narrator"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    @for (narrator of narratorList; track $index) {
                        <option value='{{ narrator.id }}'>{{ narrator.alias }}</option>
                    }
                </select>
                <div *ngIf="invalidNarrator" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('narrator')?.errors?.['required']">El narrador es requerido</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Personajes
                </label>
                <div class="md:gap-6 border-2 border-solid p-4">
                    @if (characters.length < characterList.length) {
                        <button
                            (click)="addCharacter()"
                            type="button"
                            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                            >
                            +
                        </button>
                    }
                    <div formArrayName="characters">
                        @for (control of characters.controls; track i; let i = $index; let first = $first) {
                            <div class="mb-2 flex gap-2">
                                <select
                                    [formControlName]="i"
                                    (change)="onSelectedCharacter($event, i)"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    @for (character of characterList; track $index) {
                                        <option
                                            value='{{ character.id }}'
                                            [disabled]="character.selected && characters.at(i).value != character.id"
                                            >{{ character.name }}
                                        </option>
                                    }
                                </select>
                                @if (!first) {
                                    <button type="button" (click)="removeCharacter(i)" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">
                                        -
                                    </button>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    for="introduction"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Introducción
                </label>
                <textarea
                    id="introduction"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="taleIntroduction"
                    style="resize: none;"
                ></textarea>
                <div *ngIf="invalidIntroduction" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('taleIntroduction')?.errors?.['required']">La introducción es requerida</span>
                    <span *ngIf="taleForm.get('taleIntroduction')?.errors?.['maxlength']">La introducción no puede exceder los 500 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    for="development"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Desarrollo
                </label>
                <textarea
                    id="development"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="taleDevelopment"
                    style="resize: none;"
                ></textarea>
                <div *ngIf="invalidDevelopment" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('taleDevelopment')?.errors?.['required']">El desarrollo es requerido</span>
                    <span *ngIf="taleForm.get('taleDevelopment')?.errors?.['maxlength']">El desarrollo no puede exceder los 500 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full mb-5 group">
                <label
                    for="conclusion"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Conclusión
                </label>
                <textarea
                    id="conclusion"
                    rows="4"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="taleConclusion"
                    style="resize: none;"
                ></textarea>
                <div *ngIf="invalidConclusion" class="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span *ngIf="taleForm.get('taleConclusion')?.errors?.['required']">La conclusión es requerida</span>
                    <span *ngIf="taleForm.get('taleConclusion')?.errors?.['maxlength']">La conclusión no puede exceder los 500 caracteres</span>
                </div>
            </div>
            <div class="relative z-0 w-full group m-3 text-center">
                <button
                    type="submit"
                    class="w-52 hover:text-white border focus:ring-4 focus:outline-none font-medium rounded-lg text-md px-12 py-3.5 text-center me-2 mb-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                    >Crear Cuento
                </button>
            </div>
        </form>
    </div>
  `,
  styleUrl: './tale-form.component.css'
})
export class TaleFormComponent implements OnInit {
    public taleForm!: FormGroup;

    public genreList = [
        { value: 'aventura', label: 'Aventura' },
        { value: 'c-f', label: 'Ciencia Ficción' },
        { value: 'fantasia', label: 'Fantasía' },
        { value: 'misterio', label: 'Misterio' },
        { value: 'terror', label: 'Terror' }
    ]

    public characterList: any = [];
    public narratorList: any = [];
    public formerValues: number[] = [];

    private readonly destroy$ = new Subject<void>();

    constructor(
        private readonly fb: FormBuilder,
        private readonly taleService: TaleService,
        private readonly characterService: CharacterService,
        private readonly narratorService: NarratorService,
        private readonly cdr: ChangeDetectorRef,
        private readonly router: Router
    ) {
        this.initForm();
    }

    ngOnInit() {
        this.loadCharacters();
        if (this.characterList.length > 0) {
            Swal.fire({
                allowOutsideClick: false,
                icon: 'warning',
                confirmButtonText: "Ok",
                text: 'No hay personajes para agregar a un cuento nuevo. Por favor, crea al menos uno antes de continuar.'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/character-list']);
                }
            });
        }
        this.characters.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(values => {
            if (this.formerValues.length !== values.length) {
                this.formerValues = [...values];
            }
        });
        this.loadNarrators();
        if (this.narratorList.length > 0) {
            Swal.fire({
                allowOutsideClick: false,
                icon: 'warning',
                confirmButtonText: "Ok",
                text: 'No hay narradores para agregar a un cuento nuevo. Por favor, crea al menos uno antes de continuar.'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/narrator-list']);
                }
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    initForm() {
        this.taleForm = this.fb.group({
            taleImage: ['', [Validators.required]],
            taleName: ['', [Validators.required, Validators.maxLength(30)]],
            taleGenre: ['aventura', [Validators.required]],
            narrator: ['', [Validators.required]],
            characters: this.fb.array([this.createCharacterControl()]),
            taleIntroduction: ['', [Validators.required, Validators.maxLength(500)]],
            taleDevelopment: ['', [Validators.required, Validators.maxLength(500)]],
            taleConclusion: ['', [Validators.required, Validators.maxLength(500)]],
        });
    }

    createCharacterControl() {
        this.formerValues.push(0);
        return this.fb.control('', [Validators.required]);
    }

    get characters() {
        return this.taleForm.get('characters') as FormArray;
    }

    addCharacter() {
        this.characters.push(this.createCharacterControl());
    }

    onSelectedCharacter(event: Event, index: number) {
        const selectElement = event.target as HTMLSelectElement;
        const selectedId = Number(selectElement.value);
        const formerSelected =this.formerValues[index];

        if (formerSelected) {
          this.updateSelectState(formerSelected, false);
        }

        if (selectedId) {
          this.updateSelectState(selectedId, true);
        }

        this.formerValues[index] = selectedId;
    }


    removeCharacter(index: number) {
        const characterId = this.characters.at(index).value;
        const updatedCharacters = this.characters.controls.filter((_, i) => i !== index);
        this.taleForm.setControl('characters', this.fb.array(updatedCharacters));

        this.formerValues.splice(index, 1);

        this.updateSelectState(characterId, false);

        this.cdr.detectChanges();
    }

    private updateSelectState(characterId: number, selectedOpt: boolean): void {
        const index = this.characterList.findIndex((p: { id: number; }) => p.id === Number(characterId));
        console.log(this.characterList[index], index);
        if (index !== -1) {
          this.characterList[index].selected = selectedOpt;
        }
    }


    loadCharacters(): void {
        this.characterService.getCharacters()
        .pipe(takeUntil(this.destroy$))
        .subscribe(
            {
            next: characters => {
                this.characterList = characters.map( (character: any) => {
                    return {
                        ...character,
                        selected: false
                    };
                });

                if (this.characterList.length > 0 && this.characters.length > 0) {
                    this.characters.at(0).setValue(this.characterList[0].id);
                    this.formerValues.push(this.characterList[0].id);
                    this.updateSelectState(this.characterList[0].id, true);
                  }
            },
            error: error => console.error(error)
        });
    }

    loadNarrators(): void {
        this.narratorService.getNarrators()
        .pipe(takeUntil(this.destroy$))
        .subscribe( {
            next: narrators => {
                this.narratorList = narrators;
                if ( this.narratorList.length > 0 ) {
                    this.taleForm.get('narrator')?.setValue(this.narratorList[0].id);
                  }
            },
            error: error => console.error(error)
        });
    }

    onSubmit() {
        if (this.taleForm.invalid) {
            console.log('Formulario inválido');
            Object.values(this.taleForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            console.log(this.taleForm.value);
        }
    }

    get invalidName() {
        return this.taleForm.get('taleName')?.invalid && this.taleForm.get('taleName')?.touched;
    }

    get invalidGenre() {
        return this.taleForm.get('taleGenre')?.invalid && this.taleForm.get('taleGenre')?.touched;
    }

    get invalidNarrator() {
        return this.taleForm.get('narrator')?.invalid && this.taleForm.get('narrator')?.touched;
    }

    get invalidIntroduction() {
        return this.taleForm.get('taleIntroduction')?.invalid && this.taleForm.get('taleIntroduction')?.touched;
    }

    get invalidDevelopment() {
        return this.taleForm.get('taleDevelopment')?.invalid && this.taleForm.get('taleDevelopment')?.touched;
    }

    get invalidConclusion() {
        return this.taleForm.get('taleConclusion')?.invalid && this.taleForm.get('taleConclusion')?.touched;
    }

}

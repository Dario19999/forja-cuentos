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
  templateUrl: './tale-form.component.html',
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
    public lastValues: number[] = [];
    public taleData = new FormData();
    public imageSrc: string = '';
    private errorMessage = '';

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
        this.characters.valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe(values => {
            if (this.lastValues.length !== values.length) {
                this.lastValues = [...values];
            }
        });
        this.loadNarrators();
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
        this.lastValues.push(0);
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
        const formerSelected =this.lastValues[index];

        if (formerSelected) {
          this.updateSelectState(formerSelected, false);
        }

        if (selectedId) {
          this.updateSelectState(selectedId, true);
        }

        this.lastValues[index] = selectedId;
    }


    removeCharacter(index: number) {
        const characterId = this.characters.at(index).value;
        const updatedCharacters = this.characters.controls.filter((_, i) => i !== index);
        this.taleForm.setControl('characters', this.fb.array(updatedCharacters));

        this.lastValues.splice(index, 1);

        this.updateSelectState(characterId, false);

        this.cdr.detectChanges();
    }

    private updateSelectState(characterId: number, selectedOpt: boolean): void {
        const index = this.characterList.findIndex((p: { id: number; }) => p.id === Number(characterId));
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
                        id: Number(character.id),
                        ...character,
                        selected: false
                    };
                });

                if (this.characterList.length <= 0) {
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

                if (this.characterList.length > 0 && this.characters.length > 0) {
                    this.characters.at(0).setValue(this.characterList[0].id);
                    this.lastValues.push(this.characterList[0].id);
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
                if (this.narratorList.length <= 0) {
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

                if ( this.narratorList.length > 0 ) {
                    this.taleForm.get('narrator')?.setValue(this.narratorList[0].id);
                }
            },
            error: error => console.error(error)
        });
    }

    onFileSelected(event: any) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => this.imageSrc = e.target.result;
            reader.readAsDataURL(file);
            this.taleData.append('taleImage', file);
        }
    }

    onSubmit() {
        if (this.taleForm.invalid) {
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
            this.taleData.append('title', this.taleForm.get('taleName')?.value);
            this.taleData.append('genre', this.taleForm.get('taleGenre')?.value);
            this.taleData.append('narratorId', this.taleForm.get('narrator')?.value);
            this.taleData.append('introduction', this.taleForm.get('taleIntroduction')?.value);
            this.taleData.append('development', this.taleForm.get('taleDevelopment')?.value);
            this.taleData.append('conclusion', this.taleForm.get('taleConclusion')?.value);
            this.taleData.append('characters', JSON.stringify(this.taleForm.get('characters')?.value));

            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Creando cuento...'
            });
            Swal.showLoading();

            this.taleService.createTale(this.taleData)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        confirmButtonText: "Ok",
                        text: "El cuento ha sido creado con éxito."
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.router.navigate(['/tale-list']);
                        }
                    });
                },
                error: (error) => {
                    Swal.close();
                    if (error.status === 409) {
                        this.errorMessage = "Un cuento con el mismo nombre ya existe.";
                    }
                    else {
                        this.errorMessage = "Error en el servidor. Por favor, inténtelo de nuevo.";
                    }
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        confirmButtonText: "Ok",
                        text: this.errorMessage
                    });
                }
            });
        }
    }

    get invalidImage() {
        return this.taleForm.get('taleImage')?.invalid && this.taleForm.get('taleImage')?.touched
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

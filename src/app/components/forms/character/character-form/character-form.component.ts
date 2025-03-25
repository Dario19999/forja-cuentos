import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CharacterService } from '../../../../services/character.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-form',
  templateUrl: './character-form.component.html',
  styleUrl: './character-form.component.css'
})
export class CharacterFormComponent {

    public characterTooltip = `Protagonista: Es el personaje principal de la historia\n
    Secundario: Juega un papel importante en el desarrollo de la trama o en la caracterización del protagonista, sin ser el personaje principal\n
    Antagonista: Se opone a los deseos del protagonista de una historia. Se le considera el "malo" de la historia\n`
    characterForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly characterService: CharacterService,
        private readonly router: Router,
    ){
        this.formInit();
    }

    formInit(): void {
        this.characterForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
            type: ['', [Validators.required]],
            role: ['', [Validators.required]],
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
            Swal.fire({
                allowOutsideClick: false,
                icon: 'info',
                text: 'Creando Personaje...'
            });
            Swal.showLoading();

            this.characterService.createCharacter(this.characterForm.value).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        confirmButtonText: "Ok",
                        text: 'Personaje creado correctamente'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.router.navigate(['/character-list']);
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

    get invalidName() {
        return this.characterForm.get('name')?.invalid && this.characterForm.get('name')?.touched;
    }
    get invalidType() {
        return this.characterForm.get('type')?.invalid && this.characterForm.get('type')?.touched;
    }
    get invalidDescription() {
        return this.characterForm.get('role')?.invalid && this.characterForm.get('role')?.touched;
    }
}

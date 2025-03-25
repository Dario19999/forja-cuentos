import { NarratorService } from './../../../../services/narrator.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-narrator-form',
  templateUrl: './narrator-form.component.html',
  styleUrl: './narrator-form.component.css'
})
export class NarratorFormComponent {

    public narratorTooltip = `Protagonista: Cuenta su historia en primera persona con sus palabras, centrándose siempre en él mismo.\n
Testigo: Está incluido en la narración, pero en este caso no es parte de ella, sólo cuenta lo que ve, en calidad de testigo, sin participar directamente en los acontecimientos.\n
Equisciente: Se identifica con un personaje determinado y conoce sólo aquello que conoce el personaje o aquello que a éste le han contado.\n
Deficiente: Conoce "menos que el protagonista" acerca de la historia. Registra únicamente lo que puede ser visto y oído, sin penetrar en la mente de ninguno de los personajes.\n
Omnisciente: Es quien conoce a detalle la historia. Conoce todo respecto de la narración. Puede influir en el lector, pero no siempre.\n`;
    narratorForm!: FormGroup;

    typeList = [
        { value: 'protagonista', label: 'Protagonista' },
        { value: 'testigo', label: 'Testigo' },
        { value: 'equisciente', label: 'Equisciente' },
        { value: 'deficiente', label: 'Deficiente' },
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

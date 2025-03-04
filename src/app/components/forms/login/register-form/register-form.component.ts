import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent {

    public registerForm!: FormGroup;
    private errorMessage: string = '';

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) {
        this.formInit();
    }

    formInit(): void {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(30)]],
            secondLastName: ['', [Validators.required, Validators.maxLength(30)]],
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [
                Validators.required,
                Validators.maxLength(20),
                Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/)
            ]],
        });
    }

    onSubmit(): void {
        console.log(this.registerForm.value);
        if (this.registerForm.invalid) {
            Object.values(this.registerForm.controls).forEach( control =>{
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
                text: 'Registrando Usuario...'
            });
            Swal.showLoading();

            const userData = this.registerForm.value;

            this.authService.signIn(userData).subscribe({
                next: () => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'success',
                        text: 'Usuario registrado correctamente'
                    });
                    this.router.navigate(['/tale-list']);
                },
                error: (err) => {
                    if (err.status === 409) {
                        this.errorMessage = 'Ya existe un usuario con el correo electrónico proporcionado';
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

    get invalidName(): boolean | undefined {
        return this.registerForm.get('name')?.invalid && this.registerForm.get('name')?.touched;
    }
    get invalidLastName(): boolean | undefined {
        return this.registerForm.get('lastName')?.invalid && this.registerForm.get('lastName')?.touched;
    }
    get invalidSecondLastName(): boolean | undefined {
        return this.registerForm.get('secondLastName')?.invalid && this.registerForm.get('secondLastName')?.touched;
    }
    get invalidEmail(): boolean | undefined {
        return this.registerForm.get('email')?.invalid && this.registerForm.get('email')?.touched;
    }
    get invalidPassword(): boolean | undefined {
        return this.registerForm.get('password')?.invalid && this.registerForm.get('password')?.touched;
    }

}

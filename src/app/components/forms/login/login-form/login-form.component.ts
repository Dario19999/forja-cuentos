import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
    loginForm!: FormGroup;
    errorMessage: string = '';

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) {
        this.formInit();
    }

    formInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['prueba@gmail.com', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['TestPassword1234.', [Validators.required, Validators.maxLength(20)]],
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            Object.values(this.loginForm.controls).forEach( control =>{
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
                text: 'Iniciando sesión...'
            });
            Swal.showLoading();

            const { email, password } = this.loginForm.value;
            this.authService.login(email, password)
            .subscribe({
                next: () => {
                    Swal.close();
                    this.router.navigate(['/tale-list']);
                },
                error: (err: HttpErrorResponse ) => {
                    Swal.close();
                    if (err.status === 401) {
                        this.errorMessage = 'Email o contraseña incorrectos';
                    }
                    else {
                        this.errorMessage = 'Error en el servidor. Por favor, inténtalo de nuevo más tarde';
                    }

                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        title: 'Error de Login',
                        text: this.errorMessage
                    });
                }
            })
        }
    }

    get invalidEmail(): boolean | undefined {
        return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
    }
    get invalidPassword(): boolean | undefined {
        return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
    }
}

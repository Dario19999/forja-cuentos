import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { AuthServiceService } from '../../../../services/auth-service.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
    loginForm!: FormGroup;

    constructor(
        private readonly authService: AuthServiceService,
        private readonly formBuilder: FormBuilder,
        private readonly router: Router
    ) {
        this.formInit();
    }

    formInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
            password: ['', [Validators.required, Validators.maxLength(20)]],
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
            .pipe( finalize( () => Swal.close() ) )
            .subscribe({
                next: () => {
                    console.log('Login correcto');
                    this.router.navigate(['/tale-list']);
                },
                error: (err) => {
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        title: 'Error de Login',
                        text: err.error.error.message
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

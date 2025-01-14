import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
    loginForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder
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
            console.log(this.loginForm.value);
        }
    }

    get invalidEmail(): boolean | undefined {
        return this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched;
    }
    get invalidPassword(): boolean | undefined {
        return this.loginForm.get('password')?.invalid && this.loginForm.get('password')?.touched;
    }
}

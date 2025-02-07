import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {

    registerForm!: FormGroup;

    constructor(
        private readonly formBuilder: FormBuilder
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
            console.log(this.registerForm.value);
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

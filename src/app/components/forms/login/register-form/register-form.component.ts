import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent implements OnInit {

    registerForm!: FormGroup;

    constructor(
        private formBuilder: FormBuilder
    ) {
        this.formInit();
    }

    ngOnInit(): void {
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
                Validators.minLength(8),
                Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/)
            ]],
        });
    }

    onSubmit(): void {
        if (this.registerForm.valid) {
            console.log(this.registerForm.value);
        }
    }

}

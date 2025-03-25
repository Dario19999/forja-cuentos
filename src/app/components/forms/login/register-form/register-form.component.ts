import { Component, input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {

    public registerForm!: FormGroup;
    private errorMessage: string = '';

    private emailValidators: any;
    private passwordValidators: any;

    public isEdit = input<boolean>(false);

    constructor(
        private readonly authService: AuthService,
        private readonly formBuilder: FormBuilder,
        private readonly userService: UserService,
        private readonly router: Router,
    ) {
    }

    ngOnInit(): void {
        this.emailValidators =  this.isEdit() ?
        [{value: '', disabled: true}, [Validators.email, Validators.maxLength(50)]] :
        ['', [Validators.required, Validators.email, Validators.maxLength(50)]];

        this.passwordValidators =  this.isEdit() ?
        [{value: '', disabled: true}, [
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/)
        ]] :
        ['', [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).{8,}$/)
        ]];

        this.formInit();

        if(this.isEdit()){
            this.userService.getUser().subscribe({
                next: (userData) => {
                    this.registerForm.controls['name'].setValue(userData.name);
                    this.registerForm.controls['lastName'].setValue(userData.lastName);
                    this.registerForm.controls['secondLastName'].setValue(userData.secondLastName);
                    this.registerForm.controls['email'].setValue(userData.email);
                },
                error: (err) => {
                    Swal.close();
                    Swal.fire({
                        allowOutsideClick: false,
                        icon: 'error',
                        text:  'Error en el servidor. Por favor, inténtalo de nuevo más tarde'
                    });
                }
            })
        }
    }

    formInit(): void {
        this.registerForm = this.formBuilder.group({
            name: ['', [Validators.required, Validators.maxLength(30)]],
            lastName: ['', [Validators.required, Validators.maxLength(30)]],
            secondLastName: ['', [Validators.required, Validators.maxLength(30)]],
            email: this.emailValidators,
            password: this.passwordValidators
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

            if(this.isEdit()){
                this.updateUser(userData);
            } else {
                this.registerUser(userData);
            }
        }
    }

    private registerUser(userData: any): void {
        this.authService.signIn(userData).subscribe({
            next: () => {
                Swal.close();
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    text: 'Usuario registrado correctamente'
                });
                 this.authService.login(userData.email, userData.password)
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

    private updateUser(userData: any): void {
        this.userService.updateUser(userData).subscribe({
            next: () => {
                Swal.close();
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'success',
                    text: 'Usuario actualizado correctamente'
                });
                this.router.navigate(['/tale-list']);
            },
            error: (err) => {
                Swal.close();
                Swal.fire({
                    allowOutsideClick: false,
                    icon: 'error',
                    text:  'Error en el servidor. Por favor, inténtalo de nuevo más tarde'
                });
            }
        });
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

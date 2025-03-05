import { Component, effect, Input, OnInit, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-character-list-item',
  template: `
    <form
        [formGroup]="characterListItemForm"
        (ngSubmit)="onSubmit()"
    >
        <div class="grid md:grid-cols-4 md:gap-6">
            <div class="relative z-0 w-full group">
                <input
                    type="text"
                    name="floating_character_name"
                    id="floating_character_name"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    formControlName="characterName"
                    required
                />
            </div>
            <div class="relative z-0 w-full group">
                <select
                    formControlName="characterType"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>{{character.type}}</option>
                    <option value="protagonista">Protagonista</option>
                    <option value="secundario">Secundario</option>
                    <option value="antagonista">Antagonista</option>
                </select>
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="7"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    formControlName="characterDescription"
                    style="resize: none;"
                >
                </textarea>
            </div>
            <div class="relative z-0 w-full h-full group">

                @if(!toggleEdit()){
                    <button
                        type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        (click)="toggleEdit.set(true)"
                    >Editar
                    </button>
                } @else {
                    <button
                        type="button"
                        class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                        (click)="saveChanges(character.id)"
                        >Guardar
                    </button>
                }
                <button
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                >Eliminar
                </button>
            </div>
        </div>
    </form>
  `,
  styleUrl: './character-list-item.component.css'
})
export class CharacterListItemComponent implements OnInit {
    characterListItemForm!: FormGroup;

    @Input()
    public character:any = {}

    public toggleEdit = signal<boolean>(false);

    constructor(
        private readonly fb: FormBuilder
    ) {
        effect(() => {
            if(this.toggleEdit()){
                this.characterListItemForm.get('characterName')?.enable();
                this.characterListItemForm.get('characterType')?.enable();
                this.characterListItemForm.get('characterDescription')?.enable();
            } else {
                this.characterListItemForm.get('characterName')?.disable();
                this.characterListItemForm.get('characterType')?.disable();
                this.characterListItemForm.get('characterDescription')?.disable();
            }
        });
     }

    ngOnInit(): void {
        this.formInit();
    }

    formInit() {
        this.characterListItemForm = this.fb.group({
            characterName: [{value: this.character.name, disabled: true}, [Validators.required, Validators.maxLength(100)]],
            characterType: [{value: '', disabled: true}, [Validators.required]],
            characterDescription: [{value: this.character.role, disabled: true}, [Validators.required]]
        });
    }

    onSubmit() {
        if (this.characterListItemForm.invalid) {
            Object.values(this.characterListItemForm.controls).forEach( control =>{
                if(control instanceof FormGroup){
                    Object.values(control.controls).forEach( control => control.markAllAsTouched())
                }
                else{
                    control.markAllAsTouched();
                }
            });
        }
        else{
            console.log(this.characterListItemForm.value);
        }
    }

    public saveChanges(characterId: string) {
        console.log(characterId);
        this.toggleEdit.set(false);
    }

    get invalidName() {
        return this.characterListItemForm.get('characterName')?.invalid && this.characterListItemForm.get('characterName')?.touched;
    }
    get invalidType() {
        return this.characterListItemForm.get('characterType')?.invalid && this.characterListItemForm.get('characterType')?.touched;
    }
    get invalidDescription() {
        return this.characterListItemForm.get('characterDescription')?.invalid && this.characterListItemForm.get('characterDescription')?.touched;
    }
}

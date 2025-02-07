import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-tale-list-item',
  template: `
   <form>
        <div class="grid md:grid-cols-3 md:gap-6 mt-5 mb-5">
            <div class="relative z-0 w-full group">
                <p class="text-sm text-gray-900 dark:text-white">Nombre del Cuento</p>
            </div>
        </div>
        <div class="grid md:grid-cols-3 md:gap-6">
            <div class="relative z-0 w-full group">
                <img src="../assets/img/home-background.png" alt="placeholder" width="400" height="220">
            </div>
            <div class="relative z-0 w-full group">
                <textarea
                    rows="9"
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    style="resize: none;"
                ></textarea>
            </div>
            <div class="flex flex-col z-0 w-full h-full group">
                <button
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >Editar
                </button>
                <button

                    type="button"
                    class="hidden text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >Guardar
                </button>
                <button
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                >Eliminar
                </button>
                <button
                    routerLink="/tale"
                    type="button"
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800"
                >Reporducir
                </button>
            </div>
        </div>
    </form>
  `,
  styleUrl: './tale-list-item.component.css'
})
export class TaleListItemComponent {

}

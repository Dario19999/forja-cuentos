import { Component, input } from '@angular/core';

@Component({
  selector: 'app-info-tooltip',
  templateUrl: './info-tooltip.component.html',
  styleUrl: './info-tooltip.component.css'
})
export class InfoTooltipComponent {

    public tooltipText = input<string>('');

}

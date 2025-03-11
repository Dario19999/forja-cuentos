import { ActivatedRoute } from '@angular/router';
import { TaleService } from './../../services/tale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tale',
  templateUrl: './view-tale.component.html',
  styleUrl: './view-tale.component.css'
})
export class ViewTaleComponent implements OnInit {

    public taleData:any = {};
    public taleId: number = 0;

    public textParts: string[] = [];
    public partLength: number = 500;
    public currentPartIndex: number = 0;

    constructor(
        private readonly taleService: TaleService,
        private readonly activatedRoute: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.getTale();
    }

    splitText(fullTale: string) {
        this.textParts = [];
        let start = 0;

        while (start < fullTale.length) {
          let end = start + this.partLength;

          if (end >= fullTale.length) {
            end = fullTale.length;
          } else {
            end = fullTale.lastIndexOf(' ', end);
          }

          if (end <= start) {
            end = start + this.partLength;
          }

          this.textParts.push(fullTale.slice(start, end).trim());
          start = end + 1;
        }
    }

    nextPart() {
        if (this.currentPartIndex < this.textParts.length - 1) {
            this.currentPartIndex++;
        }
    }

    prevPart() {
        if (this.currentPartIndex > 0) {
            this.currentPartIndex--;
        }
    }

    get currentTextPart(): string {
        return this.textParts[this.currentPartIndex];
    }


    getTale(): void {
        this.taleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
        this.taleService.getTale(this.taleId).subscribe({
            next: (taleData: any) => {
                this.taleData = taleData;
                this.splitText(this.taleData.fullTale);
            },
            error: (err) => {
                console.error(err);
            }
        }
        );

    }
}

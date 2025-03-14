import { ActivatedRoute } from '@angular/router';
import { TaleService } from './../../services/tale.service';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NarratorService } from '../../services/narrator.service';

@Component({
  selector: 'app-view-tale',
  templateUrl: './view-tale.component.html',
  styleUrl: './view-tale.component.css'
})
export class ViewTaleComponent implements OnInit {

    public taleData:any = {};
    public narratorData:any = {};
    public taleId: number = 0;

    public isLoading = signal<boolean>(false);
    public isNarrating = signal<boolean>(false);

    public narratorVoice: string = '';

    public textParts: string[] = [];
    public partLength: number = 500;
    public currentPartIndex: number = 0;

    private readonly destroy$ = new Subject<void>();

    @ViewChild('audioPlayer') audioPlayerRef!: ElementRef<HTMLAudioElement>;


    constructor(
        private readonly taleService: TaleService,
        private readonly narratorService: NarratorService,
        private readonly activatedRoute: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.getTale();
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
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
        this.taleService.getTale(this.taleId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
            next: (taleData: any) => {
                this.taleData = taleData;
                this.splitText(this.taleData.fullTale);
            },
            error: (err) => {
                console.error(err);
            }
        });
    }

    narrate(narrationSegment: string): void {
        this.isLoading.set(true);
        this.isNarrating.set(true);
        this.narratorService.getNarration(this.taleData.narratorId, narrationSegment).subscribe({
            next: (audioBlob: Blob) => {

                this.isLoading.set(false);

                const audioPlayer = this.audioPlayerRef.nativeElement;
                const audioUrl = URL.createObjectURL(audioBlob);

                audioPlayer.src = audioUrl;
                audioPlayer.play();

            },
            error: (err) => {
                console.error(err);
            }
        });
    }
}

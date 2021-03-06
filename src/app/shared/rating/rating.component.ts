import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'mt-rating',
    templateUrl: './rating.component.html'
})
export class RatingComponent {

    @Output() rated = new EventEmitter<number>();

    rates = [1, 2, 3, 4, 5];
    rate = 0;
    previousRate: number;

    constructor() {
    }

    setRate(r: number) {
        this.rate = r;
        this.previousRate = undefined;
        this.rated.emit(this.rate);
    }

    setTemporaryRate(r: number) {
        if (this.previousRate === undefined) {
            this.previousRate = this.rate;
        }

        this.rate = r;
    }

    clearTemporaryRate() {
        if (this.previousRate !== undefined) {
            this.rate = this.previousRate;
            this.previousRate = undefined;
        }
    }

}

import { Component } from '@angular/core';

@Component({
    selector: 'mt-order-summary',
    templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {

    rated: boolean;

    constructor() {
    }

    public rate() {
        this.rated = true;
    }

}

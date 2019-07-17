import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'mt-order-summary',
    templateUrl: './order-summary.component.html'
})
export class OrderSummaryComponent {

    rated: boolean;

    constructor() {
    }

    rate() {
        this.rated = true;
    }

}

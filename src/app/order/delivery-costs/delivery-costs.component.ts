import { Component, Input } from '@angular/core';

@Component({
    selector: 'mt-delivery-costs',
    templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent {

    @Input() delivery: number
    @Input() itemsValue: number

    constructor() {
    }

    public total(): number {
        return this.delivery + this.itemsValue;
    }

}

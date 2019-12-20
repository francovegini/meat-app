import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../restaurant-detail/shopping-cart/cart-item.model';

@Component({
    selector: 'mt-order-items',
    templateUrl: './order-items.component.html'
})
export class OrderItemsComponent {

    @Input() items: CartItem[];

    @Output() increaseQty = new EventEmitter<CartItem>();
    @Output() decreaseQty = new EventEmitter<CartItem>();
    @Output() remove = new EventEmitter<CartItem>();

    constructor() {
    }

    public emitIncreaseQty(item: CartItem) {
        this.increaseQty.emit(item);
    }

    public emitDecreaseQty(item: CartItem) {
        this.decreaseQty.emit(item);
    }

    public emitRemove(item: CartItem) {
        this.remove.emit(item);
    }


}

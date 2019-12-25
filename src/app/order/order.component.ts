import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';

@Component({
    selector: 'mt-order',
    templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

    emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    numberPattern = /^[0-9]*$/
    orderForm: FormGroup;
    orderId: string;

    // Valor do frete será fixo em 8 reais
    delivery = 8;

    paymentOptions: RadioOption[] = [
        { label: 'Dinheiro', value: 'MON' },
        { label: 'Cartão de Crédito', value: 'CRD' },
        { label: 'Cartão de Débito', value: 'DEB' }
    ];

    constructor(private orderService: OrderService,
                private router: Router,
                private formBuilder: FormBuilder) {
    }

    static equalsTo(group: AbstractControl): { [key: string]: boolean } {
        const email = group.get('email');
        const emailConfirmation = group.get('emailConfirmation');

        if (!email || !emailConfirmation) {
            return undefined;
        }
        if (email.value !== emailConfirmation.value) {
            return { emailsNotMatch: true }
        }

        return undefined;
    }

    ngOnInit() {
        this.orderForm = new FormGroup({
                name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
                email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
                emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
                address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
                number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
                optionalAddress: this.formBuilder.control(''),
                paymentOption: this.formBuilder.control('', [Validators.required])
            },
            {
                validators: [OrderComponent.equalsTo],
                updateOn: 'blur'
            })
    }

    public itemsValue(): number {
        return this.orderService.itemsValue();
    }

    public cartItems(): CartItem[] {
        return this.orderService.cartItems();
    }

    public increaseQty(item: CartItem) {
        this.orderService.increaseQty(item);
    }

    public decreaseQty(item: CartItem) {
        this.orderService.decreaseQty(item);
    }

    public remove(item: CartItem) {
        this.orderService.remove(item);
    }

    public checkOrder(order: Order) {
        order.orderItems = this.cartItems()
            .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id));
        this.orderService.checkOrder(order)
            .pipe(tap((orderId: string) => {
                this.orderId = orderId;
            }))
            .subscribe((orderId: string) => {
                this.router.navigate(['/order-summary'])
                this.orderService.clear();
            })
    }

    public isOrderCompleted(): boolean {
        return this.orderId !== undefined;
    }

}

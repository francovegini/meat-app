import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'mt-menu-item',
    templateUrl: './menu-item.component.html',
    animations: [
        trigger('menuItemAppeared', [
            state('ready', style({ opacity: 1 })),
            transition('void => ready', [
                style({ opacity: 0, transform: 'translateY(-20px)' }),
                animate('300ms 0s ease-in')
            ])
        ])
    ]
})
export class MenuItemComponent {

    menuItemState: 'ready';

    @Input() menuItem: MenuItem
    @Output() add = new EventEmitter()

    constructor() {
    }

    public emitAddEvent() {
        this.add.emit(this.menuItem)
    }

}

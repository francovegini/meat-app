import { AfterContentInit, Component, ContentChild, Input } from '@angular/core';
import { FormControlName, NgModel } from '@angular/forms';

@Component({
    selector: 'mt-input-container',
    templateUrl: './input.component.html'
})
export class InputComponent implements AfterContentInit {

    @Input() label: string;
    @Input() successMessage: string;
    @Input() errorMessage: string;
    @Input() showTip = true;

    input: any;

    @ContentChild(NgModel) model: NgModel;
    @ContentChild(FormControlName) control: FormControlName;

    constructor() {
    }

    ngAfterContentInit() {
        this.input = this.model || this.control;
        if (this.input === undefined) {
            throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou formControlName');
        }
    }

    hasSuccess(): boolean {
        return this.input.valid && (this.input.dirty || this.input.touched);
    }

    hasError(): boolean {
        return !this.input.valid && (this.input.dirty || this.input.touched);
    }

}

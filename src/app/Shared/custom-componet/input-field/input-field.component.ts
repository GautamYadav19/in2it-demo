import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export const CUSTOM_NG_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true,
};

export const CUSTOM_NG_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => InputFieldComponent),
  multi: true,
};

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
  providers: [CUSTOM_NG_VALIDATOR, CUSTOM_NG_VALUE_ACCESSOR],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() config!: { type: string; placeholder: string };
  val = '';

  onChange: any = () => {};
  onTouch: any = () => {};

  set value(val: any) {
    if (val !== undefined && this.val !== val) {
      this.val = val;
      this.onChange(val);
      this.onTouch();
    }
  }

  writeValue(value: any) {
    this.val = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  validate(control: FormControl): { [key: string]: any } | null {
    return control.value ? null : { required: true }; // Example validation
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
  }
}

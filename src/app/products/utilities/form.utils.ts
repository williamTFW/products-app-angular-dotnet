import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { ApiResponseProductBrand } from '../interfaces/apiResponse.interfaces';

export class FormUtils {
  public static getTextError(errors: ValidationErrors) {
    for (let key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido !!';
        case 'minlength':
          return `Se requieren Mínimo ${errors['minlength'].requiredLength} caracteres !`;
        case 'min':
          return `El valor minimo es de: ${errors['min'].min}`;
        default:
          return `Error, los datos ingresados no son validos !!`;
      }
    }
    return null;
  }

  public static getFieldErro(
    form: FormGroup,
    fieldName: string
  ): string | null {
    if (!form.controls[fieldName]) return null;
    const errors = form.controls[fieldName].errors ?? {};
    console.log(errors);
    return this.getTextError(errors);
  }

  public static isValidField(
    form: FormGroup,
    fieldName: string
  ): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getTypedData<T>(form: FormGroup): T {
    return form.getRawValue() as T;
  }

  /*   static getTypedData<T>(resp: ApiResponseProductBrand<T>): T | null {
    return typeof resp.data === 'object' ? (resp.data as T) : null;
  } */

  /* static getTypedData<T extends object>(form: FormGroup<any>): T {
    return form.getRawValue() as T;
  } */

  /*   public extractFormData<T>(form: FormGroup): T {
    return form.getRawValue() as T;
  }

  public static getFormData<T>(form : FormGroup ): T {
    return this.extractFormData<T>(form);
  } */
}

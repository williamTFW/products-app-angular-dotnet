import { JsonPipe, TitleCasePipe } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  IBtnAtt,
  IFormField,
  IUrlForm,
} from '../../products/interfaces/form.interfaces';
import { FormUtils } from '../../products/utilities/form.utils';
import { ProductsService } from 'src/app/products/services/products.service';
import { Router } from '@angular/router';
import { ListMsg } from 'src/app/products/store/list-msg.store';

@Component({
  selector: 'form-add',
  imports: [ReactiveFormsModule, TitleCasePipe, JsonPipe],
  templateUrl: './form-add.component.html',
})
export class FormAddComponent {
  private router = inject(Router);
  private prodServ = inject(ProductsService);
  private tableListMsg = inject(ListMsg);
  public formUtils = FormUtils;
  form = input.required<FormGroup>();
  btnAtt = input.required<IBtnAtt>();
  formFields = input.required<IFormField[]>();
  urlRequest = input.required<IUrlForm>();
  public error = signal<string | null>(null);

  /* callback */
  /* readonly onSuccess = input.required<(data: unknown) => void>(); */

  onSubmit() {
    const fieldsForm = this.form();
    console.log(fieldsForm);
    console.log(fieldsForm.value);

    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.prodServ
      .addNewData<typeof fieldsForm.value>(
        this.urlRequest().add,
        fieldsForm.value
      )
      .subscribe({
        next: (resp) => {
          console.log(resp);
          // ✅ Respuesta del backend
          // validar si es un objeto o string
          if (
            resp.status &&
            this.prodServ.isDataObject<typeof fieldsForm.value>(resp)
          ) {
            const entity =
              this.prodServ.getDataIfObject<typeof fieldsForm.value>(resp);
            console.log(entity);
            if (entity) {
              console.log(entity);
              // Agregar msg para que se muestre en la tabla al redireccionar
              this.tableListMsg.setMessage(
                `El nuevo ${this.btnAtt().entity} fue agregado correctamente !!`
              );
              // Redirigir a la ruta de lista
              this.router.navigate([this.urlRequest().list]);
            }
          }
        },
        error: (err) => {
          this.error.set(null);
          console.error(`${typeof err}\n${err}`);
          console.log(err.message);
          console.log(typeof err.message);
          this.error.set(err.message);
        },
      });
  }
}

/* const data =
      this.formUtils.getTypedData<typeof fieldsForm.value>(fieldsForm);
    console.log(data); */
/* console.log(typeof data); */

/* rxResource({
      loader: ({}) => this.prodServ.addNewData(this.urlRequest(), data),
    }); */

/* this.prodServ.addNewData<ProductBrand>(this.urlRequest(), data).subscribe({
      next: (resp) => {
        console.log(resp);
        if (resp.status && this.prodServ.isDataObject(resp)) {
          const newProdBrand =
            this.prodServ.getDataIfObject<ProductBrand>(resp);
            console.log(`respuesta data: ${newProdBrand}`);
            console.log({ newProdBrand });
          this.pBrandStore.setBrand(newProdBrand!);
        }
      },
      error: (error) => console.error(`Error en la peticion: ${error}`),
    });
  } */

/* Object.entries(fieldsForm.controls).forEach(([key, control]) => {
        console.log('campo:', key);
        console.log('valor:', control.value);
        console.log('Control:', control.errors);
        console.log('Control:', control);
      }); */

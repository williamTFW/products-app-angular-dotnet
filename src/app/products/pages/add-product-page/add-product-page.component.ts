import { Component, inject } from '@angular/core';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { FormAddComponent } from '../../../components/form-add/form-add.component';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IBtnAtt,
  IFormField,
  IUrlForm,
} from '../../interfaces/form.interfaces';
import { Environment } from '@environments/environment.development';

@Component({
  selector: 'add-product-page',
  imports: [TitlePageComponent, FormAddComponent],
  templateUrl: './add-product-page.component.html',
})
export class AddProductPageComponent {
  private fb = inject(FormBuilder);
  /* private urlReq: string = `${Environment.apiBase}/Product`; */
  private urlReq: IUrlForm = {
    actionReq: `${Environment.apiBase}/Product`,
    list: `/product/product-list`,
  };
  public getUrlReq(): IUrlForm {
    return this.urlReq;
  }

  public formFields = <IFormField[]>[
    {
      element: 'input',
      name: 'name',
      type: 'text',
      placeholder: 'product name',
    },
    {
      element: 'input',
      name: 'code',
      type: 'number',
      placeholder: 'product code',
    },
    {
      element: 'input',
      name: 'idProdBrand',
      type: 'number',
      placeholder: 'product brand code',
    },
  ];

  public btnForm = <IBtnAtt>{
    type: 'submit',
    stile: 'primary',
    text: 'add product',
    entity: 'Product',
  };

  public addProduct = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    code: [100001, [Validators.required, Validators.min(100001)]],
    idProdBrand: [1, [Validators.required, Validators.minLength(1)]],
  });
}

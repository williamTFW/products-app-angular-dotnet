import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import {
  IBtnAtt,
  IFormField,
  IUrlForm,
} from '../../interfaces/form.interfaces';
import { Environment } from '@environments/environment.development';
import { FormComponent } from 'src/app/components/form-product/form.component';

@Component({
  selector: 'add-product-brand-page',
  imports: [TitlePageComponent, ReactiveFormsModule, FormComponent],
  templateUrl: './add-product-brand-page.component.html',
})
export class AddProductBrandPageComponent {
  private fb = inject(FormBuilder);
  private urlReq: IUrlForm = {
    actionReq: `${Environment.apiBase}/ProductBrand`,
    list: `/product/product-brand-list`,
  };
  public getUrlReq(): IUrlForm {
    return this.urlReq;
  }

  public formField = <IFormField[]>[
    {
      element: 'input',
      type: 'text',
      name: 'name',
      placeholder: 'product brand name',
    },
  ];

  public btnForm = <IBtnAtt>{
    type: 'submit',
    stile: 'primary',
    text: 'add product brand',
    entity: 'Product Brand',
  };

  addProdBrandForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });
}

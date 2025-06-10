import { Component, computed, inject, input, signal } from '@angular/core';
import { FormComponent } from 'src/app/components/form-product/form.component';
import { TitlePageComponent } from '../../../components/title-page/title-page.component';
import { ProductsService } from '../../services/products.service';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IBtnAtt,
  IFormField,
  IUrlForm,
} from '../../interfaces/form.interfaces';
import { Environment } from '@environments/environment.development';

@Component({
  selector: 'app-update-product-brand-page',
  imports: [TitlePageComponent, FormComponent],
  templateUrl: './update-product-brand-page.component.html',
})
export class UpdateProductBrandPageComponent {
  private prodServices = inject(ProductsService);
  private fb = inject(FormBuilder);
  // id tomado por el parametro que se pasa desde la url
  /*   private isInitialized = signal(false);

  ngOnInit() {
    this.isInitialized.set(true);
    } */

  public id = input.required<string>();

  public isIdReady = computed(() => !!this.id());

  public urlReq = computed<IUrlForm>(() => {
    const id = this.id();
    if (!id) {
      return {
        actionReq: '',
        list: '/product/product-brand-list',
      };
    }
    return {
      actionReq: `${Environment.apiBase}/ProductBrand/${id}`,
      list: '/product/product-brand-list',
    };

    /* if (!this.isInitialized()) return { actionReq: '', list: '' };
    return {
      actionReq: `${Environment.apiBase}/ProductBrand/${this.id()}`,
      list: '/product/product-brand-list',
    }; */
  });

  public formFields = <IFormField[]>[
    {
      element: 'input',
      name: 'name',
      type: 'text',
      placeholder: 'product brand name',
    },
  ];

  public btnForm = <IBtnAtt>{
    type: 'submit',
    stile: 'primary',
    text: 'update',
    entity: 'Product Brand',
  };

  updateProdBrandForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });
}

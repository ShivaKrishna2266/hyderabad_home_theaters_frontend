import { Injectable } from '@angular/core';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  brandData! : BrandDTO;
  productData! : ProductDTO;
  categoryData! : CategoryDTO;
}

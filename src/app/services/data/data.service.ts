import { Injectable } from '@angular/core';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  brandData! : BrandDTO;
  productData! : ProductDTO;
  categoryData! : CategoryDTO;
  subCategoryData! : SubCategoryDTO;
}

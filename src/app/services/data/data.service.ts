import { Injectable } from '@angular/core';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ContactUsDTO } from 'src/app/DTO/contactUsDTO';
import { CountryCodeDTO } from 'src/app/DTO/countryCodeDTO';
import { GeneralSettingsDTO } from 'src/app/DTO/generalSettingsDTO';
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
  contactUsDat! : ContactUsDTO;
  countryCodeData! : CountryCodeDTO;
  generalSettingsData! : GeneralSettingsDTO;
}

import { Injectable } from '@angular/core';
import { BannerDTO } from 'src/app/DTO/bannerDTO';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { ContactUsDTO } from 'src/app/DTO/contactUsDTO';
import { CountryCodeDTO } from 'src/app/DTO/countryCodeDTO';
import { CustomersDTO } from 'src/app/DTO/customersDTO';
import { GeneralSettingsDTO } from 'src/app/DTO/generalSettingsDTO';
import { HeaderDTO } from 'src/app/DTO/headerDTO';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { ProfileDTO } from 'src/app/DTO/profileDTO';
import { ProjectDTO } from 'src/app/DTO/projectDTO';
import { QuestionDTO } from 'src/app/DTO/questionDTO';
import { ReviewDTO } from 'src/app/DTO/reviewDTO';
import { SubCategoryDTO } from 'src/app/DTO/subCategoryDTO';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';

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
  testimonialData! : TestimonialDTO;
  profileData! : ProfileDTO;
  questionsData!:QuestionDTO;
  reviewData! : ReviewDTO;
  headerData! : HeaderDTO;
  projectData! : ProjectDTO;
  customerData! : CustomersDTO;
  bannerData! : BannerDTO;
}

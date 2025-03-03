import { Injectable } from '@angular/core';
import { BrandDTO } from 'src/app/DTO/brandDTO';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  brandData! : BrandDTO;
}

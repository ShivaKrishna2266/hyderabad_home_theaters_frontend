import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent implements OnInit {
   brands: BrandDTO[] =[];
   imageURL: File | null = null;
   categoryForm : FormGroup = this.formBuilder.group({});
  constructor(
            private formBuilder :FormBuilder,
            private categoryService : CategoryService,
            private brandService : BrandService,
            private router: Router,
  ){}


ngOnInit(): void {
  this.getAllBrands();
  this.categoryForm = this.formBuilder.group({
    categoryName: ['', Validators.required],
    description: ['', Validators.required],
    tagline: ['', Validators.required],
    // status: ['', Validators.required],
    // imageUrl: ['', Validators.required],
    brandId: ['', Validators.required],
  })
}

  getAllBrands(){
    this.brandService.getAllBrands().subscribe(
      (res :any) =>{
          this.brands = res.data;
      },
      (error) =>{
        console.error("Brands Are not Shown ", error);
      }
    )
  }

onSubmit() {
if(this.categoryForm.valid){
  const formData = this.categoryForm.value;
  this.categoryService.addCategory(formData).subscribe(
    (res :any)=>{
     console.log("Category is added Successfully", res);
     this.router.navigate(["/admin/view-categories"])
    }, err => {
      console.error("Error Adding Brand", err);
    });
}

}


onFileChange($event: Event,arg1: string) {
  throw new Error('Method not implemented.');
  }


}

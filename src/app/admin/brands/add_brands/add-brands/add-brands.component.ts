import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
// import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/admin/brand.service';
import { CategoryService } from 'src/app/services/admin/category.service';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent implements OnInit {

  categories : CategoryDTO[] = [];
  imageURL: File | null = null;
  brandForm: FormGroup = this.formBuilder.group({})

  constructor(
              private formBuilder: FormBuilder,
              private brandService: BrandService,
              private categoryService : CategoryService,
              private router: Router,
  ) { }

  ngOnInit(): void {

    this.getAllCategories();

    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      brandDescription: ['', Validators.required],
      tagLine: ['', Validators.required],
      status: ['', Validators.required],
      categoryId:['', Validators.required],
      imageURL: ['', Validators.required],
    });
  }

  getAllCategories():void{
    this.categoryService.getAllCategories().subscribe(
      (res: any)=>{
        this.categories = res.data;
      },
      (error) =>{
        console.log("Categories not show")
      }
    )

  }

  onSubmit() {
    if (this.brandForm.valid && this.imageURL) {
      const brandData = this.brandForm.value;
      console.log("Payload Sent:", brandData); // 🔍 Debugging
      if(this.imageURL){
      this.brandService.addBrand(brandData, this.imageURL).subscribe(
        (res:any) => {
          console.log("Brand is Added Successfully", res);
          this.router.navigate(["/admin/view-brands"]);
        },
        err => {
          console.error("Error Adding Brand", err);
        }
      );
    }
    } else {
      console.log("Form is invalid");
    }

  }

  onFileChange(event: any, fileType: string):void{
    const files: FileList = event.target.files;
    if(files.length > 0) {
      if(fileType === 'imageURL'){
        this.imageURL = files[0];
      }
    }

  }
  
}

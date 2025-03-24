import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandDTO } from 'src/app/DTO/brandDTO';
// import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/admin/brand.service';

@Component({
  selector: 'app-add-brands',
  templateUrl: './add-brands.component.html',
  styleUrls: ['./add-brands.component.scss']
})
export class AddBrandsComponent implements OnInit {
  brandForm: FormGroup = this.formBuilder.group({})

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.brandForm = this.formBuilder.group({
      brandName: ['', Validators.required],
      brandDescription: ['', Validators.required],
      tagLine: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.brandForm.valid) {
      const brandData = this.brandForm.value;
      console.log("Payload Sent:", brandData); // 🔍 Debugging
      
      this.brandService.addBrand(brandData).subscribe(
        res => {
          console.log("Brand is Added Successfully", res);
          this.router.navigate(["/admin/view-brands"]);
        },
        err => {
          console.error("Error Adding Brand", err);
        }
      );
    } else {
      console.log("Form is invalid");
    }
  }
  
}

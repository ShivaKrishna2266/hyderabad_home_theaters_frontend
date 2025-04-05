import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';
import { TestimonialService } from 'src/app/services/admin/testimonial.service';

@Component({
  selector: 'app-add-testimonial',
  templateUrl: './add-testimonial.component.html',
  styleUrls: ['./add-testimonial.component.scss']
})
export class AddTestimonialComponent implements OnInit {

  TestimonialForm: FormGroup = this.formBuilder.group({});
  public testimonials: TestimonialDTO[] = [];
  image: File | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private testimonialService: TestimonialService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.TestimonialForm = this.formBuilder.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.TestimonialForm.valid && this.image) {
      const testimonialData = this.TestimonialForm.value;
      console.log("Payload Sent:", testimonialData); // 🔍 Debugging

      if(this.image){
      this.testimonialService.addTestimonial(testimonialData, this.image).subscribe(
        (res: any) => {
          console.log("Testimonial is Added Successfully", res);
          this.router.navigate(["/admin/view-testimonial"]);
        },
        err => {
          console.error("Error Adding Testimonial", err);
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
      if(fileType === 'image'){
        this.image = files[0];
      }
    }

  }
}
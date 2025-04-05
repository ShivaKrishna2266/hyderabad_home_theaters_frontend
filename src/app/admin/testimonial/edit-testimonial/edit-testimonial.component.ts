import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';
import { TestimonialService } from 'src/app/services/admin/testimonial.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-testimonial',
  templateUrl: './edit-testimonial.component.html',
  styleUrls: ['./edit-testimonial.component.scss']
})
export class EditTestimonialComponent implements OnInit {

    testimonial: TestimonialDTO = {} as TestimonialDTO;
    image: File | null = null;

  constructor(
              private testimonialService :TestimonialService,
              private router : Router,
              private dataService : DataService,
  ){};


  ngOnInit(): void {
     this.testimonial = this.dataService.testimonialData || {} as TestimonialDTO;
  }

  onSubmit(){
    if (!this.testimonial.name || !this.testimonial.testimonialId && this.image) {
      alert('Please fill all required fields.');
      return;
    }
    if(this.image){
    if (confirm('Are you sure you want to update this testimonial?')) {
      this.testimonialService.updateTestimonial(this.testimonial, this.image).subscribe(
        (res: any) => {
          console.log('Testimonial Successfully updated');
          alert('Testimonial updated successfully!');
          this.router.navigate(["/admin/view-testimonial"]);
        },
        (error) => {
          console.error('Error:', error);
          alert('Failed to update brand. Please try again.');
        }
      );
    }
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



import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialDTO } from 'src/app/DTO/testimonialDTO';
import { TestimonialService } from 'src/app/services/admin/testimonial.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-testimonial',
  templateUrl: './view-testimonial.component.html',
  styleUrls: ['./view-testimonial.component.scss']
})
export class ViewTestimonialComponent implements OnInit {
deteleTestimonial() {
throw new Error('Method not implemented.');
}
  filteredTestimonails: TestimonialDTO[] = [];


   public pageSize: number = 5;
   public currentPage: number = 1;
   public totalItems: number = 0;
   @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
              private dataService : DataService,
              private  testimonialService : TestimonialService,
              private router: Router,
  ){};


  ngOnInit(): void {
    this.getAllTestimonial();
    
  }
filter() {
throw new Error('Method not implemented.');
}


getAllTestimonial(){
  this.testimonialService.getAllTestimonial().subscribe(
    (res: any)=>{
      this.filteredTestimonails = res.data;
    },
    (error)=>{
      console.log("Testimonial data Not Showing");
    }
  )
}
addtestimonail() {
  alert("Please confirm if you want to add the Testimonial.");
  this.router.navigate(['admin/add-testimonial']);
}

updateTestimonial(testimonial : TestimonialDTO){
  alert("Please confirm if you want to Update the Testimonial.");
  this.dataService.testimonialData = testimonial,
  this.router.navigate(['admin/edit-testimonial']);
}
updateTestimonialStatus() {
  throw new Error('Method not implemented.');
  }


  calculateTotalPages() {
    if (this.filteredTestimonails) {
      this.totalItems = this.filteredTestimonails.length;
    } else {
      this.totalItems = 0;
    }
  }

  getTotalPages(): number {
    this.calculateTotalPages();
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getPageArray(): number[] {
    const totalPages = this.getTotalPages();
    const maxVisiblePages = 5;
    const pages: number[] = [];

    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

}

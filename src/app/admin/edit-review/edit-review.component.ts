import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReviewDTO } from 'src/app/DTO/reviewDTO';
import { ReviewService } from 'src/app/services/admin/review.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-review',
  templateUrl: './edit-review.component.html',
  styleUrls: ['./edit-review.component.scss']
})
export class EditReviewComponent implements OnInit {

   reviews :ReviewDTO  = {} as ReviewDTO;

  constructor(
    private dataService: DataService,
    private router: Router,
    private reviewService: ReviewService
  ) { };

  ngOnInit(): void {
    const reviewData = this.dataService.reviewData;
    if (reviewData) {
      this.reviews = reviewData;
    }
  }


  onSubmit(): void {
    if (!this.reviews.review || !this.reviews.reviewId) {
      alert('Please fill all required fields: Review Name and Review reviewId.');
      return;
    }

    this.reviewService.updateReviews(this.reviews).subscribe(
      (res: any) => {
        console.log('Review Successfully updated:', res);
        alert('Review updated successfully!');
        this.router.navigate(['/admin/review']);
      },
      (error: any) => {
        console.error('Error updating Review:', error);
        alert(`Failed to updateReview. ${error.message || 'Unknown error'}`);
      }
    );
  }

}

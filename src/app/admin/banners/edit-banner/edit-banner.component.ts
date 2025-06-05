import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BannerDTO } from 'src/app/DTO/bannerDTO';
import { BannerService } from 'src/app/services/admin/banner.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {
   banners: BannerDTO = {} as BannerDTO;
   
  
    constructor(
      private dataService: DataService,
      private bannerService: BannerService,
      private router : Router,
    ) {}
  
    ngOnInit(): void {
      this.banners = this.dataService.bannerData || {} as BannerDTO; // Ensure brand is an object
    }

  
    onSubmit(): void {
      if (!this.banners.bannerId) {
        alert('Please fill all required fields.');
        return;
      }
  
      if (confirm('Are you sure you want to update this Banner?')) {
        this.bannerService.updateBanner(this.banners).subscribe(
          (res: any) => {
            console.log('Banner Successfully updated');
            alert('Banner updated successfully!');
            this.router.navigate(["/admin/view-banners"]);
          },
          (error) => {
            console.error('Error:', error);
            alert('Failed to update Banner. Please try again.');
          }
        );
      }
    }

}

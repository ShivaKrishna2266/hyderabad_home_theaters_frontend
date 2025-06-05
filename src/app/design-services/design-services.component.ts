import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from '../services/data_loader/data-loader.service';
import { BannerDTO } from '../DTO/bannerDTO';

@Component({
  selector: 'app-design-services',
  templateUrl: './design-services.component.html',
  styleUrls: ['./design-services.component.scss']
})
export class DesignServicesComponent implements OnInit {
  banner?: BannerDTO;
  title: string = 'Services Banner';  // your target title

  constructor(private dataLoaderService: DataLoaderService) {}

  ngOnInit(): void {
    this.loadBannerByTitle();
  }

  loadBannerByTitle(): void {
    this.dataLoaderService.getBannerByTitle(this.title).subscribe({
      next: (res) => {
        this.banner = res.data;
      },
      error: (err) => {
        console.error('Banner not found:', err);
      }
    });
  }

 onImgError(event: Event) {
  const img = event.target as HTMLImageElement;
  img.src = 'assets/banners_images/fallback-image.jpg';  // fallback image
}
}
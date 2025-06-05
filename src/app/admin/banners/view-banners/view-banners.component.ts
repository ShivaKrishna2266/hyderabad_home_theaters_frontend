import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BannerDTO } from 'src/app/DTO/bannerDTO';
import { BannerService } from 'src/app/services/admin/banner.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-view-banners',
  templateUrl: './view-banners.component.html',
  styleUrls: ['./view-banners.component.scss']
})
export class ViewBannersComponent implements OnInit {

  banners: BannerDTO[] = [];


  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private bannerService: BannerService,
    private router: Router,
    private dataService: DataService,

  ) { };
  ngOnInit(): void {
    this.getAllBanners();
  }
  getAllBanners() {
    this.bannerService.getAllBanners().subscribe(
      (res: any) => {
        this.banners = res.data;
      },
      (error) => {
        console.error("Error fetching Banners", error)
      }
    )
  }
  addBanner() {
    this.router.navigate(['admin/add-banners']);
  }
  updateBanner(banner: BannerDTO) {
    this.dataService.bannerData = banner;
    this.router.navigate(['admin/edit-banners']);
  }
  deleteBanner(banner: BannerDTO) {
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage);
    }
  }

  getTotalPages(): number {
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
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BannerDTO } from 'src/app/DTO/bannerDTO';
import { BannerService } from 'src/app/services/admin/banner.service';

@Component({
  selector: 'app-add-banners',
  templateUrl: './add-banners.component.html',
  styleUrls: ['./add-banners.component.scss']
})
export class AddBannersComponent implements OnInit {
  banners: BannerDTO[] = [];

  imagePreviews: string[] = [];
  videoFile: File | null = null;

  images: File[] = [];
  videos: File[] = [];

  bannerForm: FormGroup = this.formBuilder.group({})

  constructor(
    private formBuilder: FormBuilder,
    private bannerService: BannerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bannerForm = this.formBuilder.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      url: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.bannerForm.valid) {
      const formValue = this.bannerForm.value;
      const formData = new FormData();

      formData.append('bannerDTO', new Blob([JSON.stringify(formValue)], { type: 'application/json' }));

      this.images.forEach(file => {
        formData.append('bannerImageFiles', file);
      });

      this.videos.forEach(file => {
        formData.append('bannerVideoFiles', file); // Add video field
      });

      this.bannerService.addBanners(formData).subscribe(
        (res: any) => {
          alert('Banner successfully added!');
          this.router.navigate(['/admin/view-banners']);
        },
        (err) => {
          console.error('Error Adding Banner:', err);
          alert('Failed to add banner.');
        }
      );
    } else {
      alert('Please fill all required fields.');
    }
  }
  onImageChange(event: any): void {
    const files: FileList = event.target.files;
    this.images = [];
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }
  onVideoChange(event: any): void {
    const files: FileList = event.target.files;
    this.videos = [];
    for (let i = 0; i < files.length; i++) {
      this.videos.push(files[i]);
    }
  }


}

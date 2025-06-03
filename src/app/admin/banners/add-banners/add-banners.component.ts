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
  banners : BannerDTO[]= [];

brandForm: FormGroup = this.formBuilder.group({})

  constructor(
              private formBuilder: FormBuilder,
              private bannerService: BannerService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    
     this.brandForm = this.formBuilder.group({
          title: ['', Validators.required],
          subTitle: ['', Validators.required],
          url: ['', Validators.required],
          status: ['', Validators.required],
          // proStatus:['', Validators.required],
          // coverImage: ['', Validators.required],
        });
  }

    onSubmit() {}

}

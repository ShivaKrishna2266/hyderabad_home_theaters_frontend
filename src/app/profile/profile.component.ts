import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStorageService } from '../services/storege/user-storege.service';
import { ProfileService } from '../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileForm!:FormGroup;
  profile: any ;
  email!:string;



  constructor(private formBuilder: FormBuilder,
             private profileService: ProfileService,
             private userStorageService: UserStorageService
             
                ) {
    }

    ngOnInit(): void {
     this.profileForm = this.formBuilder.group({
      firstName:[null, [Validators.required]],
      surname:[null, [Validators.required]],
      email:[UserStorageService.getEmail()],
      mobileNumber:[null,  [Validators.required]],
      addressLine1:[null, [Validators.required]],
      addressLine2:[null],
      landmark:[null],
      area:[null, [Validators.required]],
      city:[null, [Validators.required]],
      postCode:[null, [Validators.required]],
      state:[null, [Validators.required]],
      country:[null, [Validators.required]],
      region:[null]

     });
    this.email =UserStorageService.getEmail();
    // this.profile = JSON.parse(UserStorageService.getProfile());
   this.profile = UserStorageService.getProfile();
    
   }

  onSubmit(){
    console.log(JSON.stringify(this.profileForm.value));
    this.profileService.saveProfile(this.profileForm.value).subscribe((res: any)=>{
          this.profile = res.data;
    });
  }

}


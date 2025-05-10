import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactUsDTO } from 'src/app/DTO/contactUsDTO';
import { CountryCodeDTO } from 'src/app/DTO/countryCodeDTO';
import { GeneralSettingsDTO } from 'src/app/DTO/generalSettingsDTO';
import { DataLoaderService } from 'src/app/services/data_loader/data-loader.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  public countryCodes: CountryCodeDTO[] = [];
  public contactUs: ContactUsDTO[] = [];
  public generalSettings: GeneralSettingsDTO[] = [];
  contactUsForm!: FormGroup;
  public generalSetting: any = {};
  public countryCode: any = 0;
  public submitted = false;

  constructor(
    private dataLoaderService: DataLoaderService,
    private formBuilder: FormBuilder,
     private snackBar: MatSnackBar,
    // private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllGeneralSettings();
    this.getAllCountryCode();

    this.contactUsForm = this.formBuilder.group({
      name: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      phoneNo: ['', Validators.required],
      countryCode: [this.countryCode, Validators.required],
      message: ['', Validators.required]
    });
  }

  get f() {
    return this.contactUsForm.controls;
  }

onSubmit() {
  this.submitted = true;
  if (this.contactUsForm.valid) {
    const contactUsData = this.contactUsForm.value;
    this.dataLoaderService.addCountactUs(contactUsData).subscribe(
      (res) => {
        this.contactUsForm.reset({
          name: '',
          emailId: '',
          phoneNo: '',
          countryCode: this.countryCode,
          message: ''
        });
        this.submitted = false;

        this.snackBar.open('Thank you for contacting us, our team will get in touch with you shortly.', 'Close', {
          duration: 5000, // ms
          verticalPosition: 'top', // or 'bottom'
          horizontalPosition: 'center', // or 'start', 'end'
          panelClass: ['success-snackbar'] // Optional custom style
        });
      },
      (error) => {
        console.error('Error submitting contact form:', error);
        this.snackBar.open('Oops! Something went wrong. Please try again.', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['error-snackbar']
        });
      }
    );
  }
}


  getAllCountryCode() {
    this.dataLoaderService.getAllCountryCodes().subscribe(
      (res: any) => {
        this.countryCodes = res.data; // Corrected mapping
      },
      (error) => {
        console.error('Error fetching country codes:', error);
      }
    );
  }

  getAllGeneralSettings() {
    this.dataLoaderService.getAllGeneralSettings().subscribe(
      (res: any) => {
        this.generalSettings = res.data; // Corrected mapping
        this.generalSetting = res.data[0] || {}; // Ensure it doesn't break if empty
      },
      (error) => {
        console.error('Error fetching GeneralSettings:', error);
      }
    );
  }
}

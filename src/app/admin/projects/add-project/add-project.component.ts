import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectDTO } from 'src/app/DTO/projectDTO';
import { ProjectService } from 'src/app/services/admin/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projects: ProjectDTO[] = [];
  // images: File | null = null;
  images: File[] = [];
  imagePreviews: string[] = [];
  projectForm: FormGroup = this.formBuilder.group({})

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      customerName: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      // images: ['', Validators.required],
    });
  }


  onSubmit() {
    if (this.projectForm.valid && this.images.length > 0) {
      const formValue = this.projectForm.value;

      const formData = new FormData();

      // Append project form fields as JSON blob under key 'projectsDTO'
      formData.append('projectsDTO', new Blob([JSON.stringify(formValue)], { type: 'application/json' }));

      // Append image files under the key expected by backend ('projectsImageFiles')
      this.images.slice(0, 2).forEach(file => {  // limit to 2 images
        formData.append('projectsImageFiles', file);
      });

      this.projectService.createProject(formData).subscribe(
        (res: any) => {
          console.log("Project is Added Successfully", res);
          this.router.navigate(['/admin/admin-projects']);
        },
        (error: any) => {
          console.error("Error Adding Project", error);
        }
      );
    } else {
      console.log("Form is invalid or no images selected");
    }
  }


  onFileChange(event: any): void {
    const files: FileList = event.target.files;
    this.images = [];
    this.imagePreviews = [];

    for (let i = 0; i < files.length && i < 2; i++) {
      const file = files[i];
      this.images.push(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviews.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    if (files.length > 2) {
      alert('You can only upload up to 2 images.');
    }
  }


}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductDTO } from 'src/app/DTO/productDTO';
import { ProjectDTO } from 'src/app/DTO/projectDTO';
import { ProjectService } from 'src/app/services/admin/project.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

     public projects: ProjectDTO[] = [];   

   public pageSize: number = 5;
   public currentPage: number = 1;
   public totalItems: number = 0;
  
   @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();
  
  constructor(
            private dataService :DataService,
            private projectService: ProjectService,
  ){

  }

  ngOnInit(): void {
    this.getAllProjects();
  }


  getAllProjects(){
    this.projectService.getAllProjects().subscribe(
      (res :{data :ProjectDTO[]})=>{
        this.projects = res.data;
      },
       (error) => {
        console.error('Error fetching Projects:', error);
      }
    );
  }

  addProjects(){}

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

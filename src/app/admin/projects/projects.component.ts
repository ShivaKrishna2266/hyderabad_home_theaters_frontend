import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  public pageSize = 5;
  public currentPage = 1;
  public totalItems = 0;

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      (res: { data: ProjectDTO[] }) => {
        this.projects = res.data.map(project => ({
          ...project,
          images: project.images ?? [],  // <-- ensure images is an array
        }));
        this.totalItems = this.projects.length;
      },
      (error) => {
        console.error('Error fetching Projects:', error);
      }
    );
  }

  addProjects(): void {
    this.router.navigate(['admin/add-project']);
  }

  editProject(project: ProjectDTO): void {
    console.log('Edit project:', project);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
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
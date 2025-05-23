import { Component, OnInit } from '@angular/core';
import { ProjectDTO } from '../DTO/projectDTO';
import { DataLoaderService } from '../services/data_loader/data-loader.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: ProjectDTO[] = [];

  public currentPage: number = 1;
public itemsPerPage: number = 3;

  constructor(
    private dataLoaderService: DataLoaderService,
  ) { };

  ngOnInit(): void {
    this.getAllProjects();
  }

 getAllProjects() {
  this.dataLoaderService.getAllProjects().subscribe(
    (res: { data: ProjectDTO[] }) => {
      this.projects = res.data.map(project => ({
        ...project,
        images: project.images ?? [] // Default to empty array if undefined
      }));
    },
    (error) => {
      console.error('Error fetching projects:', error);
    }
  );
}



get paginatedProjects(): ProjectDTO[] {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.projects.slice(start, start + this.itemsPerPage);
}

get totalPages(): number {
  return Math.ceil(this.projects.length / this.itemsPerPage);
}

goToPage(page: number): void {
  if (page >= 1 && page <= this.totalPages) {
    this.currentPage = page;
  }
}

}

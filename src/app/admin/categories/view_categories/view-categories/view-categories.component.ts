import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryDTO } from 'src/app/DTO/categoryDTO';
import { CategoryService } from 'src/app/services/admin/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit{


  public filteredCategories : CategoryDTO[] = [];



  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  constructor(
              private categoryService :CategoryService,
              private router :Router,
  ){}

ngOnInit(): void {
  this.getAllCategories();
}


getAllCategories(){
  this.categoryService.getAllCategories().subscribe(
    (res) =>{
      this.filteredCategories = res.data;
    },
    (error) =>{
      console.log("Categories Data Failed ", error);
    }
  )
}
addCategories() {
this.router.navigate(["admin/add-categories"]);
}
updateCategory(){
  this.router.navigate(["admin/edit-categories"]);
}




calculateTotalPages() {
  if (this.filteredCategories) {
    this.totalItems = this.filteredCategories.length;
  } else {
    this.totalItems = 0;
  }
}

getTotalPages(): number {
  this.calculateTotalPages();
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
onPageChange(page: number): void {
  if (page >= 1 && page <= this.getTotalPages()) {
    this.currentPage = page;
    this.pageChange.emit(this.currentPage);
  }
}

}

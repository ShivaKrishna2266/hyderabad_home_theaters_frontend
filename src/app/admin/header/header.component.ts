import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderDTO } from 'src/app/DTO/headerDTO';
import { HeaderService } from 'src/app/services/admin/header.service';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
public selectedHeader: HeaderDTO = {} as HeaderDTO;
  public isNewHeader: boolean = true;

  constructor(private headerService: HeaderService) {}

  ngOnInit(): void {
    this.getHeader();
  }

  getHeader(): void {
    this.headerService.getAllHeaders().subscribe(
      (res) => {
        if (res.data && res.data.length > 0) {
          this.selectedHeader = res.data[0]; // Edit first one
          this.isNewHeader = false;
        } else {
          this.selectedHeader = {} as HeaderDTO; // Add new
          this.isNewHeader = true;
        }
      },
      (error) => {
        console.error('Error fetching header:', error);
      }
    );
  }

  onSubmit(): void {
  if (this.isNewHeader) {
    this.headerService.createHeader(this.selectedHeader).subscribe(
      (res) => {
        alert('Header added successfully!');
        this.getHeader(); // Refresh data
      },
      (error) => {
        console.error('Error creating header:', error);
      }
    );
  } else {
    if (this.selectedHeader.headerId) {  // Make sure ID exists
      this.headerService.updateHeader(this.selectedHeader.headerId, this.selectedHeader).subscribe(
        (res) => {
          alert('Header updated successfully!');
        },
        (error) => {
          console.error('Error updating header:', error);
        }
      );
    } else {
      console.error('No header ID found for update!');
    }
  }
}

}
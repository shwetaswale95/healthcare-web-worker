import { PatientDataService } from './../services/patient-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {


  filteredData: any = [];
  searchTerm = '';
  page: number = 1;
  pageSize: number = 20;
  originalData: any = [];
  noRecordsFound: boolean = false;

  constructor(private patientDataService: PatientDataService) {}

  ngOnInit() {
    this.getClientList();
  }

  getClientList() {
    this.patientDataService.getLocalData().subscribe(res => {
      this.originalData = res;
      this.filteredData = [...this.originalData]
    });
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredData = this.originalData.filter((item: any) => {
        return item.personal_details.first_name.toLowerCase().includes(this.searchTerm.toLowerCase());
      
    });
    this.noRecordsFound = this.filteredData.length === 0;
    } else {
      this.filteredData = [...this.originalData];
      this.noRecordsFound = false;
    }
  }

}

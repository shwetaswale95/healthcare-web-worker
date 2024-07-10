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
  filterTerm = '';
  page: number = 1;
  pageSize: number = 20;

  constructor(private patientDataService: PatientDataService) {}

  ngOnInit() {
    this.filterData();
  }

  filterData() {
    this.patientDataService.getLocalData().subscribe(res => {
      console.log(res)
      this.filteredData = res;
    })
    // this.filteredData = this.data.filter(item => {
    //   return item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
    //          (!this.filterTerm || item.value === this.filterTerm);
    // });
  }

}

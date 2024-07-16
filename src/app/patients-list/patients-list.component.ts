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
  isBusy: boolean = false;
  private worker!: Worker

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
    // if (this.searchTerm) {
    //   this.filteredData = this.originalData.filter((item: any) => {
    //     return item.personal_details.first_name.toLowerCase().includes(this.searchTerm.toLowerCase());
    // });
    // this.noRecordsFound = this.filteredData.length === 0;
    // } else {
    //   this.filteredData = [...this.originalData];
    //   this.noRecordsFound = false;
    // }
    this.isBusy = true;
    if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase();
        const start = performance.now();
        while (performance.now() - start < 3000) {
          // Blocking the main thread for 2 seconds
          this.isBusy = false;
        }
        this.filteredData = this.originalData.filter((item: any) => this.containsTerm(item, term));
        this.noRecordsFound = this.filteredData.length === 0;
        
      
    } else {
      this.filteredData = [...this.originalData];
      this.noRecordsFound = false;
      this.isBusy = false;
    }
  }

  containsTerm(item: any, term: string): boolean {
    // If the item is an object, check its values
    if (item && typeof item === 'object') {
      return Object.values(item).some(value => this.containsTerm(value, term));
    }
    // If the item is a string, check if it includes the search term
    if (typeof item === 'string') {
      return item.toLowerCase().includes(term);
    }
    // If the item is a number, check if its string representation includes the search term
    if (typeof item === 'number') {
      return item.toString().includes(term);
    }
    return false;
  }


  filterArrayWithWorker() {
    this.isBusy = true;
    // if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../filter.worker', import.meta.url));
      this.worker.onmessage = ({ data }) => {
        this.filteredData = data;
        this.isBusy = false;
      };
      const term = this.searchTerm.toLowerCase();
      this.worker.postMessage({ array: this.originalData, term: term });
    // } else {
    //   // Web Workers are not supported in this environment
    //   this.onSearch();
    // }
  }

  alert(message: string) {
    window.alert(message);
  }


}

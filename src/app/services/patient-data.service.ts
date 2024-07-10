import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {

  constructor(private http: HttpClient) { }

  getLocalData(){
    return this.http.get('../../assets/database/patient_records.json');
  }
}

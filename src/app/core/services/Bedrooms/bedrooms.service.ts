import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../constants/apiUrl.constant';

@Injectable({
  providedIn: 'root',
})
export class BedroomsService {
  constructor(
    private http: HttpClient
  ) {}

  getAllBedrooms() {
    this.http.get(`${apiUrl}/bed`)  
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class Bathroom1Service {

  constructor(
    private http:HttpClient
  ) { }
  getAllBathrooms(): Observable<iApiResponse> {
  return this.http.get<iApiResponse>(`${apiUrl}/bathrooms/?
  location=bathroom1`);
  }
}

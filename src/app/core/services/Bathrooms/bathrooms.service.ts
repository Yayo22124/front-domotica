import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../constants/apiUrl.constant';
import { Observable } from 'rxjs';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class BathroomsService {
  constructor(
    private http: HttpClient
  ) { }
  getAllBathrooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bathrooms/?limit=1000`)
  }
  getBathroomsData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bathrooms/?location=${location}&limit=1000`)
  }
}

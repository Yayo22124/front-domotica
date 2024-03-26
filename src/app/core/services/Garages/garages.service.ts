import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class GaragesService {
  constructor(private http: HttpClient) {}

  getAllGarages(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/garages/?limit=500`);
  }
  getGaragesData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/garages/?location=${location}&limit=500`)
  }
}

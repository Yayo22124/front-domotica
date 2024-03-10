import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class KitchensService {
  constructor(
    private http: HttpClient
  ) { }
  getAllkitchens(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/kitchens/`)  
  }

  getKitchenData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/kitchens/?location=${location}`)  
  }
}

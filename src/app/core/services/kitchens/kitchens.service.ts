import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class KitchensService {
  constructor(
    private http: HttpClient
  ) {}

  getAllKitchens(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/kitchen/?limit=1000`)  
  }

  getKitchenData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/kitchen/?location=${location}&limit=1000`)   
  }
}

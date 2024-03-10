import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllRooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/rooms/`);
  }
}

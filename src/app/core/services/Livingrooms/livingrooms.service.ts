import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from '../../constants/apiUrl.constant';
import { Observable } from 'rxjs';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class LivingroomsService {
  constructor(private http:HttpClient
    ) { }

    getAllLivingrooms(): Observable<iApiResponse>{
      return this.http.get<iApiResponse>(`${apiUrl}/livingrooms/`);    
    }

    getLivingroomData(location: string): Observable <iApiResponse> {
      return this.http.get<iApiResponse>(`${apiUrl}/livingrooms/?location=${location}`);
    }
}

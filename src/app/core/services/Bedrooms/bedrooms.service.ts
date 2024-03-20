import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class BedroomsService {
  constructor(
    private http: HttpClient
  ) {}

  getAllBedrooms(): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bedrooms/?limit=1000`)  
  }

  getBedroomData(location: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/bedrooms/?location=${location}&limit=1000`) ;
  }

  getComponentRecords(location: string, room: string, componentName: string): Observable<iApiResponse> {
    return this.http.get<iApiResponse>(`${apiUrl}/rooms/component/?location=${location}&room=${room}&componentName=${componentName}`);
  }
  
  handleInLed(arduinoIp: string, status: boolean): Observable<iApiResponse> {
    if (status === true) {
      return this.http.get<iApiResponse>(`http://${arduinoIp}/ledOn`)
    } 
    return this.http.get<iApiResponse>(`http://${arduinoIp}/ledOff`)
  }
}

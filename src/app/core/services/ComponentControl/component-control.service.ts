import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../constants/apiUrl.constant';
import { iApiResponse } from '../../interfaces/i-ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class ComponentControlService {

  constructor(private http: HttpClient) { }
  private url = "http://";

  lightOn(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOn`)
  }
  
  lightOff(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOff`)
  }

  doubleWindowsOpen(arduinoIp: string): Observable<any> {
    const windowLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftOn`);
    const windowRight = this.http.get<any>(`${this.url}${arduinoIp}/windowRightOn`);

    return windowLeft;
  }

  doubleWindowsClose(arduinoIp: string): Observable<any> {
    const windowLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftOff`);
    const windowRight = this.http.get<any>(`${this.url}${arduinoIp}/windowRightOff`);

    return windowLeft;
  }
  
  
  simpleWindowOpen(arduinoIp: string): Observable<any> {
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowOn`);
    
    return window;
  }
  
  simpleWindowClose(arduinoIp: string): Observable<any> {
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowOff`);
    
    return window;
  }

  doorOpen(arduinoIp: string): Observable<any> {
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorOpen`);
    
    return door;
  }

  doorClose(arduinoIp: string): Observable<any> {
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorClose`);
    
    return door;
  }

  fanOn(arduinoIp: string): Observable<any> {
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOn`);
    
    return fan;
  }

  fanOff(arduinoIp: string): Observable<any> {
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOff`);
    
    return fan;
  }
}

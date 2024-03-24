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

  lightInOn(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledIndoorOn`)
  }
  
  lightInOff(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledIndoorOff`)
  }
  lightOutOn(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOutdoorOn`)
  }
  
  lightOutOff(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOutdoorOff`)
  }
  doubleWindowsOpen(arduinoIp: string): Observable<any> {
    const windowLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftOpen`);
    const windowRight = this.http.get<any>(`${this.url}${arduinoIp}/windowRightOpen`);

    return windowLeft;
  }

  doubleWindowsClose(arduinoIp: string): Observable<any> {
    const windowLeft = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftClose`);
    const windowRight = this.http.get<any>(`${this.url}${arduinoIp}/windowRightClose`);

    return windowLeft;
  }
  
  
  simpleWindowOpen(arduinoIp: string): Observable<any> {
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftOpen`);
    
    return window;
  }
  
  simpleWindowClose(arduinoIp: string): Observable<any> {
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowLeftClose`);
    
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

  controlOn(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOn`);
  }

  controlOff(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOff`);
  }

  controlFOn(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOn`);
  }

  controlFOff(arduinoIp: string): Observable<any> {
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOff`);
  }
}

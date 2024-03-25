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
    console.warn("Encendiendo Luz Interior");
    console.log(`${this.url}${arduinoIp}/ledIndoorOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/ledIndoorOn`);
  }
  
  lightInOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Luz Interior");
    console.log(`${this.url}${arduinoIp}/ledIndoorOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/ledIndoorOff`);
  }
  lightOutOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Luz Exterior");
    console.log(`${this.url}${arduinoIp}/ledOutdoorOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOutdoorOn`);
  }
  
  lightOutOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Luz Exterior");
    console.log(`${this.url}${arduinoIp}/ledOutdoorOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/ledOutdoorOff`);
  }
  doubleWindowsOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Ventanas Dobles");
    console.log(`${this.url}${arduinoIp}/windowsOpen`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsOpen`);
    
    return windows;
  }
  
  doubleWindowsClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Ventanas Dobles");
    console.log(`${this.url}${arduinoIp}/windowsClose`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsClose`);
    
    return windows;
  }
  
  doubleWindowsLeftOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Ventanas Dobles Izquierda");
    console.log(`${this.url}${arduinoIp}/windowsLeftOpen`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsLeftOpen`);
    
    return windows;
  }
  
  doubleWindowsLeftClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Ventanas Dobles Izquierda");
    console.log(`${this.url}${arduinoIp}/windowsLeftClose`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsLeftClose`);
    
    return windows;
  }
  
  doubleWindowsRightOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Ventanas Dobles Derecha");
    console.log(`${this.url}${arduinoIp}/windowsRightOpen`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsRightOpen`);
    
    return windows;
  }
  
  doubleWindowsRightClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Ventanas Dobles Derecha");
    console.log(`${this.url}${arduinoIp}/windowsRightClose`);
    const windows = this.http.get<any>(`${this.url}${arduinoIp}/windowsRightClose`);
    
    return windows;
  }
  
  simpleWindowOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Ventana");
    console.log(`${this.url}${arduinoIp}/windowOpen`);
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowOpen`);
    
    return window;
  }
  
  simpleWindowClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Ventana");
    console.log(`${this.url}${arduinoIp}/windowClose`);
    const window = this.http.get<any>(`${this.url}${arduinoIp}/windowClose`);
    
    return window;
  }
  
  doorOpen(arduinoIp: string): Observable<any> {
    console.warn("Abriendo Puerta");
    console.log(`${this.url}${arduinoIp}/doorOpen`);
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorOpen`);
    
    return door;
  }
  
  doorClose(arduinoIp: string): Observable<any> {
    console.warn("Cerrando Puerta");
    console.log(`${this.url}${arduinoIp}/doorClose`);
    const door = this.http.get<any>(`${this.url}${arduinoIp}/doorClose`);
    
    return door;
  }
  
  fanOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Ventilador");
    console.log(`${this.url}${arduinoIp}/fanOn`);
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOn`);
    
    return fan;
  }
  
  fanOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Ventilador");
    console.log(`${this.url}${arduinoIp}/fanOff`);
    const fan = this.http.get<any>(`${this.url}${arduinoIp}/fanOff`);
    
    return fan;
  }
  
  controlOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Modo Manual Led Exterior");
    console.log(`${this.url}${arduinoIp}/controlLedOutOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOn`);
  }
  
  controlOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Modo Manual Led Exterior");
    console.log(`${this.url}${arduinoIp}/controlLedOutOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlLedOutOff`);
  }
  
  controlFOn(arduinoIp: string): Observable<any> {
    console.warn("Encendiendo Modo Manual Ventilador");
    console.log(`${this.url}${arduinoIp}/controlFanOn`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOn`);
  }
  
  controlFOff(arduinoIp: string): Observable<any> {
    console.warn("Apagando Modo Manual Ventilador");
    console.log(`${this.url}${arduinoIp}/controlFanOff`);
    return this.http.get<any>(`${this.url}${arduinoIp}/controlFanOff`);
  }
}

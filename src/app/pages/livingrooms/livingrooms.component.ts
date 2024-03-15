import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { LivingroomsService } from './../../core/services/Livingrooms/livingrooms.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';

@Component({
  selector: 'app-livingrooms',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatDividerModule, TemperatureDataItemComponent, PhotoresistorDataItemComponent, FontAwesomeModule],
  templateUrl: './livingrooms.component.html',
  styleUrl: './livingrooms.component.scss'
})
export class LivingroomsComponent implements OnInit {
  constructor(
    private LivingroomsService: LivingroomsService,
    private route : ActivatedRoute,
    private loadingService: LoadingService
  ){

  }

  public livingroomsSensor: iSensorsData[] | undefined= [];
  public livingroomsActuators: iActuatorsData[]  | undefined= [];
  public livingroomName : string | null = "";

  public dhtData: iSensorsData | null = null;
  public ldrData: iSensorsData | null = null;
  public fanData: iActuatorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowLeftData: iActuatorsData | null = null;
  public windowRightData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params)=>{
          this.livingroomName = params.get('location');

          this.getLivingroomData(this.livingroomName!);
        }
      )
  }

  getLivingroomData(location: string){
    this.loadingService.showLoading();
    this.LivingroomsService.getLivingroomData(location).subscribe(
      (response: iApiResponse) =>{
        console.log(response);
        this.livingroomsActuators = response.actuatorsData;
        this.livingroomsSensor = response.sensorsData;

        if(this.livingroomsActuators && this.livingroomsSensor){
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.livingroomsSensor.find(sensor => sensor.name === 'Temperatura y Humedad')!;
          this.ldrData = this.livingroomsSensor.find(sensor => sensor.name === 'Fotorresistencia')!;
          
          // Separar los datos de actuadores en variables individuales
          this.fanData = this.livingroomsActuators.find(actuator => actuator.name === 'Ventilador')!;
          this.doorData = this.livingroomsActuators.find(actuator => actuator.name === 'Servomotor Puerta')!;
          this.windowLeftData = this.livingroomsActuators.find(actuator => actuator.name === 'Servomotor Ventana Doble Izquierda')!;
          this.windowRightData = this.livingroomsActuators.find(actuator => actuator.name === 'Servomotor Ventana Doble Derecha')!;
          this.inLightData = this.livingroomsActuators.find(actuator => actuator.name === 'Led Interior')!;
          this.exLightData = this.livingroomsActuators.find(actuator => actuator.name === 'Led Exterior')!;
        }
        this.loadingService.hideLoading();
      }, (error) => {
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }
}
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GaragesService } from './../../core/services/Garages/garages.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { ProximityDataItemComponent } from '../../components/proximity-data-item/proximity-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-garages-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule, MatDividerModule, TemperatureDataItemComponent, PhotoresistorDataItemComponent, FontAwesomeModule, ProximityDataItemComponent],
  templateUrl: './garages-page.component.html',
  styleUrl: './garages-page.component.scss'
})
export class GaragesPageComponent implements OnInit {
  constructor(
    private garagesService: GaragesService,
    private route : ActivatedRoute,
    private loadingService: LoadingService
  ){
  }
  public garageSensor: iSensorsData[] | undefined= [];
  public garageActuators: iActuatorsData[]  | undefined= [];
  public garageName : string | null = "";
  public dhtData: iSensorsData | null = null;
  public ldrData: iSensorsData | null = null;
  public proximityData: iSensorsData | null = null;
  public fanData: iActuatorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowLeftData: iActuatorsData | null = null;
  public windowRightData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params)=>{
          this.garageName = params.get('location');

          this.getGaragesData(this.garageName!);
        }
      )
  }

  getGaragesData(location: string){
    this.loadingService.showLoading();
    this.garagesService.getGaragesData(location).subscribe(
      (response: iApiResponse) =>{
        console.log(response);
        this.garageActuators = response.actuatorsData;
        this.garageSensor = response.sensorsData;

        if(this.garageActuators && this.garageSensor){
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.garageSensor.find(sensor => sensor.name === 'Temperatura y Humedad')!;
          this.ldrData = this.garageSensor.find(sensor => sensor.name === 'Fotorresistencia')!;
          this.proximityData = this.garageSensor.find(sensor => sensor.name === 'Proximidad')!;

          
          // Separar los datos de actuadores en variables individuales
          this.fanData = this.garageActuators.find(actuator => actuator.name === 'Ventilador')!;
          this.doorData = this.garageActuators.find(actuator => actuator.name === 'Puerta')!;
          this.windowLeftData = this.garageActuators.find(actuator => actuator.name === 'Ventana Doble Izquierda')!;
          this.windowRightData = this.garageActuators.find(actuator => actuator.name === 'Ventana Doble Derecha')!;
          this.inLightData = this.garageActuators.find(actuator => actuator.name === 'Led Interior')!;
          this.exLightData = this.garageActuators.find(actuator => actuator.name === 'Led Exterior')!;
        }
        this.loadingService.hideLoading();
      }, (error) => {
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }
}

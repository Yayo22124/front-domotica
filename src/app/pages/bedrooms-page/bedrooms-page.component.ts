import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iComponentInformation } from '../../core/interfaces/i-ComponentInformation';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-bedrooms-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    TemperatureDataItemComponent,
    PhotoresistorDataItemComponent,
    FontAwesomeModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    TemperatureDataItemComponent,
    PhotoresistorDataItemComponent,
    FontAwesomeModule,
    MatSlideToggleModule,
    FanDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
  ],
  templateUrl: './bedrooms-page.component.html',
  styleUrl: './bedrooms-page.component.scss',
})
export class BedroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];  
  public actuatorsData: iActuatorsData[] | undefined = [];  
  public bedroomName: string | null = "";
  public room: string | null = "";

  public dhtData: iSensorsData | null = null;
  public ldrData: iSensorsData | null = null;
  public fanData: iActuatorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowLeftData: iActuatorsData | null = null;
  public windowRightData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;

  constructor(
    private bedroomsService: BedroomsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
    ) {
      
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.room = this.bedroomName = params.get('location');
      console.log(this.router.url);
      this.roomPath = this.router.url;
      this.getBedroomData(this.bedroomName!);
    });
  }

  getBedroomData(location: string) {
    this.loadingService.showLoading();
    this.bedroomsService.getBedroomData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;

        if (this.actuatorsData && this.sensorsData) {
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.sensorsData.find(
            (sensor) => sensor.name === 'Temperatura y Humedad'
          )!;
          this.ldrData = this.sensorsData.find(
            (sensor) => sensor.name === 'Fotorresistencia'
          )!;

          // Separar los datos de actuadores en variables individuales
          this.fanData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Ventilador'
          )!;
          this.doorData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Puerta'
          )!;
          this.windowLeftData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Ventana Doble Izquierda'
          )!;
          this.windowRightData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Ventana Doble Derecha'
          )!;
          this.inLightData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Led Interior'
          )!;
          this.exLightData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Led Exterior'
          )!;
        }
        this.loadingService.hideLoading();
      },
      (error) => {
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }
}

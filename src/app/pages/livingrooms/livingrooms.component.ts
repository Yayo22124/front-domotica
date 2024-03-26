import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { iApiResponse, iLastApiResponse } from '../../core/interfaces/i-ApiResponse';

import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LivingroomsService } from './../../core/services/Livingrooms/livingrooms.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { WindowDoubleDataItemComponent } from '../../components/window-double-data-item/window-double-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-livingrooms',
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
    MatSlideToggleModule,
    FanDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    WindowDoubleDataItemComponent,
  ],
  templateUrl: './livingrooms.component.html',
  styleUrl: './livingrooms.component.scss',
})
export class LivingroomsComponent implements OnInit {
  constructor(
    private LivingroomsService: LivingroomsService,
    private route: ActivatedRoute,
    // * --------- *
    private router: Router,
    // * --------- *
    private loadingService: LoadingService
  ) {}

  public livingroomsSensor!: { _id: string; lastRecord: iSensorsData }[];
  public livingroomsActuators!: { _id: string; lastRecord: iActuatorsData }[];
  // * --------- *
  public livingroomName: string | null = '';
  public roomPath: string = '';
  public room: string | null = '';
  // * --------- *

  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | undefined = undefined;
  public fanData: iActuatorsData | undefined = undefined;
  public doorData: iActuatorsData | undefined = undefined;
  public windowLeftData: iActuatorsData | undefined = undefined;
  public windowRightData: iActuatorsData | undefined = undefined;
  public inLightData: iActuatorsData | undefined = undefined;
  public exLightData: iActuatorsData | undefined = undefined;

  private pollingInterval: any;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      // * --------
      this.room = this.livingroomName = params.get('location');
      this.roomPath = this.router.url;
      // * --------
      this.getLivingroomData(this.livingroomName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getLivingroomData(this.livingroomName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getLivingroomData(location: string) {
    console.log(`Obteniendo Datos en ${this.livingroomName}`);
    this.loadingService.showLoading();
    this.LivingroomsService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.livingroomsActuators = response.actuatorsData;
        this.livingroomsSensor = response.sensorsData;

        if (this.livingroomsActuators && this.livingroomsSensor) {
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.livingroomsSensor.find(({lastRecord}) => lastRecord.name.toLowerCase().includes('temperatura'))?.lastRecord;

          this.ldrData = this.livingroomsSensor.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord;

          // Separar los datos de actuadores en variables individuales
          this.fanData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventilador'
          )?.lastRecord;

          this.doorData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord;

          this.windowLeftData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana Izquierda'
          )?.lastRecord;

          this.windowRightData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana Derecha'
          )?.lastRecord;


          this.inLightData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Led Interior'
          )?.lastRecord;

          this.exLightData = this.livingroomsActuators.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord;
        }
        console.log(`Datos Obtenidos en ${this.livingroomName}`)
        this.loadingService.hideLoading();
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.livingroomName}`)
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getLivingroomData(this.livingroomName!);
  }
}

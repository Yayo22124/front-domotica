import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  iApiResponse,
  iLastApiResponse,
} from '../../core/interfaces/i-ApiResponse';

import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { Subscription } from 'rxjs';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { WindowDoubleDataItemComponent } from '../../components/window-double-data-item/window-double-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-bedrooms-page',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TemperatureDataItemComponent,
    PhotoresistorDataItemComponent,
    FanDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    WindowDoubleDataItemComponent
  ],
  templateUrl: './bedrooms-page.component.html',
  styleUrl: './bedrooms-page.component.scss',
})
export class BedroomsPageComponent implements OnInit {
  public sensorsData!: { _id: string; lastRecord: iSensorsData }[];
  public actuatorsData!: { _id: string; lastRecord: iActuatorsData }[];
  public bedroomName: string | null = '';
  public room: string | null = '';

  public dhtData: iSensorsData | undefined = undefined;
  public ldrData: iSensorsData | undefined = undefined;
  public fanData: iActuatorsData | undefined = undefined;
  public doorData: iActuatorsData | undefined = undefined;
  public windowLeftData: iActuatorsData | undefined = undefined;
  public windowRightData: iActuatorsData | undefined = undefined;
  public inLightData: iActuatorsData | undefined = undefined;
  public exLightData: iActuatorsData | undefined = undefined;

  private pollingInterval: any;


  constructor(
    private bedroomsService: BedroomsService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  public roomPath: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.room = this.bedroomName = params.get('location');
      console.log(this.router.url);
      this.roomPath = this.router.url;
      this.getBedroomData(this.bedroomName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getBedroomData(this.bedroomName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getBedroomData(location: string) {
    this.loadingService.showLoading();
    this.bedroomsService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;

        if (this.actuatorsData && this.sensorsData) {
          // Separar los datos de sensores en variables individuales
          this.dhtData = this.sensorsData.find(({ lastRecord }) =>
            lastRecord.name.toLowerCase().includes('temperatura')
          )?.lastRecord;

          this.ldrData = this.sensorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord;

          // Separar los datos de actuadores en variables individuales
          this.fanData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventilador'
          )?.lastRecord;

          this.doorData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord;

          this.windowLeftData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana Izquierda'
          )?.lastRecord;

          this.windowRightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana Derecha'
          )?.lastRecord;

          this.inLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Led Interior'
          )?.lastRecord;

          this.exLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord;
        }
        this.loadingService.hideLoading();
      },
      (error) => {
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getBedroomData(this.bedroomName!);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  iApiResponse,
  iLastApiResponse,
} from '../../core/interfaces/i-ApiResponse';

import { ActivatedRoute } from '@angular/router';
import { BathroomsService } from '../../core/services/Bathrooms/bathrooms.service';
import { CommonModule } from '@angular/common';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { PresenceDataItemComponent } from '../../components/presence-data-item/presence-data-item.component';
import { ProximityDataItemComponent } from '../../components/proximity-data-item/proximity-data-item.component';
import { SimpleWindowComponent } from '../../components/simple-window/simple-window.component';
import { WaterPumpDataItemComponent } from '../../components/water-pump-data-item/water-pump-data-item.component';
import { apiUrl } from '../../core/constants/apiUrl.constant';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-bathrooms-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    PhotoresistorDataItemComponent,
    ProximityDataItemComponent,
    PresenceDataItemComponent,
    InLightDataItemComponent,
    WaterPumpDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    SimpleWindowComponent,
  ],
  templateUrl: './bathrooms-page.component.html',
  styleUrl: './bathrooms-page.component.scss',
})
export class BathroomsPageComponent implements OnInit {
  public sensorsData!: { _id: string; lastRecord: iSensorsData }[];
  public actuatorsData!: { _id: string; lastRecord: iActuatorsData }[];
  public bathroomName: string | null = '';

  public ldrData: iSensorsData | undefined = undefined;
  public presenceData: iSensorsData | undefined = undefined;
  public proximityData: iSensorsData | undefined = undefined;
  public doorData: iActuatorsData | undefined = undefined;
  public windowData: iActuatorsData | undefined = undefined;
  public inLightData: iActuatorsData | undefined = undefined;
  public exLightData: iActuatorsData | undefined = undefined;
  public waterPumpData: iActuatorsData | undefined = undefined;

  private pollingInterval: any;

  constructor(
    private bathroomsService: BathroomsService,
    private route: ActivatedRoute,
    private loadinService: LoadingService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bathroomName = params.get('location');
      this.getBathroomsData(this.bathroomName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getBathroomsData(this.bathroomName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getBathroomsData(location: string) {
    console.log(`Obteniendo Datos en ${this.bathroomName}`);
    this.loadinService.showLoading();
    this.bathroomsService.getLastData(location).subscribe(
      (response: iLastApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;

        if (this.actuatorsData && this.sensorsData) {
          this.ldrData = this.sensorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Fotorresistencia'
          )?.lastRecord;

          this.proximityData = this.sensorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Proximidad'
          )?.lastRecord;

          this.presenceData = this.sensorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Presencia'
          )?.lastRecord;

          this.doorData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Puerta'
          )?.lastRecord;

          this.windowData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Ventana'
          )?.lastRecord;

          this.inLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Led Interior'
          )?.lastRecord;

          this.exLightData = this.actuatorsData.find(
            ({ lastRecord }) => lastRecord.name === 'Led Exterior'
          )?.lastRecord;
        }

        console.log(`Datos Obtenidos en ${this.bathroomName}`);
        this.loadinService.hideLoading();
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.bathroomName}`);
        this.loadinService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getBathroomsData(this.bathroomName!);
  }
}

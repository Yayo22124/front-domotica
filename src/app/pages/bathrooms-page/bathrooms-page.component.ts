import { Component, OnInit } from '@angular/core';

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
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
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
    SimpleWindowComponent
  ],
  templateUrl: './bathrooms-page.component.html',
  styleUrl: './bathrooms-page.component.scss',
})
export class BathroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];
  public actuatorsData: iActuatorsData[] | undefined = [];
  public bathroomName: string | null = '';

  public ldrData: iSensorsData | null = null;
  public presenceData: iSensorsData | null = null;
  public proximityData: iSensorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;
  public waterPumpData: iActuatorsData | null = null;

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
    this.loadinService.showLoading();
    this.bathroomsService.getBathroomsData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;

        if (this.actuatorsData && this.sensorsData) {
          this.ldrData = this.sensorsData.find(
            (sensor) => sensor.name === 'Fotorresistencia'
          )!;
          this.presenceData = this.sensorsData.find(
            (sensor) => sensor.name === 'Presencia'
          )!;
          this.proximityData = this.sensorsData.find(
            (sensor) => sensor.name === 'Proximidad'
          )!;

          this.doorData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Puerta'
          )!;
          this.windowData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Ventana'
          )!;

          this.inLightData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Led Interior'
          )!;

          this.exLightData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Led Exterior'
          )!;

          this.waterPumpData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Bomba de Agua'
          )!;
        }

        this.loadinService.hideLoading();
      },
      (error) => {
        this.loadinService.hideLoading();
        console.error(error);
      }
    );
  }

  onActuatorUpdate() {
    this.getBathroomsData(this.bathroomName!);
  }
}

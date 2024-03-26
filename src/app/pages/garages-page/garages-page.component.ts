import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BuzzerDataItemComponent } from '../../components/buzzer-data-item/buzzer-data-item.component';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GaragesService } from './../../core/services/Garages/garages.service';
import { GateDoubleDataItemComponent } from '../../components/gate-double-data-item/gate-double-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { PresenceDataItemComponent } from '../../components/presence-data-item/presence-data-item.component';
import { ProximityDataItemComponent } from '../../components/proximity-data-item/proximity-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-garages-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
    MatIconModule,
    MatDividerModule,
    PhotoresistorDataItemComponent,
    FontAwesomeModule,
    ProximityDataItemComponent,
    PresenceDataItemComponent,
    InLightDataItemComponent,
    DoorDataItemComponent,
    ExLightDataItemComponent,
    BuzzerDataItemComponent,
    GateDoubleDataItemComponent,
  ],
  templateUrl: './garages-page.component.html',
  styleUrl: './garages-page.component.scss',
})
export class GaragesPageComponent implements OnInit {
  constructor(
    private garagesService: GaragesService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}
  public garageSensor: iSensorsData[] | undefined = [];
  public garageActuators: iActuatorsData[] | undefined = [];
  public garageName: string | null = '';
  public presenceData: iSensorsData | null = null;
  public dhtData: iSensorsData | null = null;
  public ldrData: iSensorsData | null = null;
  public proximityData: iSensorsData | null = null;
  public fanData: iActuatorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowLeftData: iActuatorsData | null = null;
  public windowRightData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;
  public buzzerData: iActuatorsData | null = null;
  public gateLeftData: iActuatorsData | null = null;
  public gateRightData: iActuatorsData | null = null;

  private pollingInterval: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.garageName = params.get('location');

      this.getGaragesData(this.garageName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getGaragesData(this.garageName!);
    }, pollingIntervalTime); // 5000 milisegundos = 5 segundos
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getGaragesData(location: string) {
    this.loadingService.showLoading();
    console.log(`Obteniendo Datos en ${this.garageName}`)
    
    this
    .garagesService.getGaragesData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.garageActuators = response.actuatorsData;
        this.garageSensor = response.sensorsData;

        if (this.garageActuators && this.garageSensor) {
          // Separar los datos de sensores en variables individuales
          this.ldrData = this.garageSensor.find(
            (sensor) => sensor.name === 'Fotorresistencia'
          )!;
          this.proximityData = this.garageSensor.find(
            (sensor) => sensor.name === 'Proximidad'
            )!;
            this.presenceData = this.garageSensor.find(
            (sensor) => sensor.name === 'Presencia'
            )!;

          // Separar los datos de actuadores en variables individuales
          this.inLightData = this.garageActuators.find(
            (actuator) => actuator.name === 'Led Interior'
            )!;
          this.doorData = this.garageActuators.find(
            (actuator) => actuator.name === 'Puerta'
            )!;
            this.exLightData = this.garageActuators.find(
              (actuator) => actuator.name === 'Led Exterior'
          )!;
          this.buzzerData = this.garageActuators.find(
            (actuator) => actuator.name === 'Alarma' || actuator.name === "Buzzer"
          )!;
          this.gateLeftData = this.garageActuators.find(
            (actuator) => actuator.name === 'Porton Izquierda'
            )!;
          this.gateRightData = this.garageActuators.find(
            (actuator) => actuator.name === 'Porton Derecha'
          )!;
        }
        this.loadingService.hideLoading();
        console.log(`Datos Obtenidos en ${this.garageName}`)
      },
      (error) => {
        console.log(`Datos No Obtenidos en ${this.garageName}`)
        this.loadingService.hideLoading();
        console.error(error);
      }
      );
  }

  onActuatorUpdate() {
    this.getGaragesData(this.garageName!);
  }
}

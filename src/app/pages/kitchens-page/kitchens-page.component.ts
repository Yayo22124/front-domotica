import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BuzzerDataItemComponent } from '../../components/buzzer-data-item/buzzer-data-item.component';
import { DoorDataItemComponent } from '../../components/door-data-item/door-data-item.component';
import { ExLightDataItemComponent } from '../../components/ex-light-data-item/ex-light-data-item.component';
import { FanDataItemComponent } from '../../components/fan-data-item/fan-data-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GasDataItemComponent } from '../../components/gas-data-item/gas-data-item.component';
import { InLightDataItemComponent } from '../../components/in-light-data-item/in-light-data-item.component';
import { KitchensService } from '../../core/services/kitchens/kitchens.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { TemperatureDataItemComponent } from '../../components/temperature-data-item/temperature-data-item.component';
import { WindowDoubleDataItemComponent } from '../../components/window-double-data-item/window-double-data-item.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-kitchens-page',
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
    DoorDataItemComponent,
    FanDataItemComponent,
    GasDataItemComponent,
    BuzzerDataItemComponent,
    ExLightDataItemComponent,
    InLightDataItemComponent,
    WindowDoubleDataItemComponent,
  ],
  templateUrl: './kitchens-page.component.html',
  styleUrl: './kitchens-page.component.scss',
})
export class KitchensPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];
  public actuatorsData: iActuatorsData[] | undefined = [];
  public kitchenName: string | null = '';

  public dhtData: iSensorsData | null = null;
  public ldrData: iSensorsData | null = null;
  public fanData: iActuatorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public windowLeftData: iActuatorsData | null = null;
  public windowRightData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;
  public buzzerData: iActuatorsData | null = null;
  public gasData: iSensorsData | null = null;

  constructor(
    private kitchensService: KitchensService,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {}

  private pollingInterval: any;


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.kitchenName = params.get('location');

      this.getKitchenData(this.kitchenName!);
    });

    this.pollingInterval = setInterval(() => {
      this.getKitchenData(this.kitchenName!);
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getKitchenData(location: string) {
    this.loadingService.showLoading();
    this.kitchensService.getKitchenData(location).subscribe(
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
          this.gasData = this.sensorsData.find(
            (sensor) => sensor.name === 'Gas'
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
          this.buzzerData = this.actuatorsData.find(
            (actuator) => actuator.name === 'Buzzer'
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

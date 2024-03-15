import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-bedrooms-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './bedrooms-page.component.html',
  styleUrl: './bedrooms-page.component.scss'
})
export class BedroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];  
  public actuatorsData: iActuatorsData[] | undefined = [];  
  public bedroomName: string | null = "";

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

    this.route.paramMap.subscribe(
      (params) => {
        this.bedroomName = params.get('location');

        this.getBedroomData(this.bedroomName!)
      }
    )
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
          this.dhtData = this.sensorsData.find(sensor => sensor.name === 'Temperatura y Humedad')!;
          this.ldrData = this.sensorsData.find(sensor => sensor.name === 'Fotoresistencia')!;
          
          // Separar los datos de actuadores en variables individuales
          this.fanData = this.actuatorsData.find(actuator => actuator.name === 'Ventilador')!;
          this.doorData = this.actuatorsData.find(actuator => actuator.name === 'Servomotor Puerta')!;
          this.windowLeftData = this.actuatorsData.find(actuator => actuator.name === 'Servomotor Ventana Doble Izquierda')!;
          this.windowRightData = this.actuatorsData.find(actuator => actuator.name === 'Servomotor Ventana Doble Derecha')!;
          this.inLightData = this.actuatorsData.find(actuator => actuator.name === 'Led Interior')!;
          this.exLightData = this.actuatorsData.find(actuator => actuator.name === 'Led Exterior')!;
        }
        this.loadingService.hideLoading();
      }, (error) => {
        this.loadingService.hideLoading();
        console.error(error);
      }
    );
  }
  
}

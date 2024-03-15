import { Component, OnInit } from '@angular/core';
import { BathroomsService } from '../../core/services/Bathrooms/bathrooms.service';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { Observable } from 'rxjs';
import { apiUrl } from '../../core/constants/apiUrl.constant';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PhotoresistorDataItemComponent } from '../../components/photoresistor-data-item/photoresistor-data-item.component';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ProximityDataItemComponent } from '../../components/proximity-data-item/proximity-data-item.component';
@Component({
  selector: 'app-bathrooms-page',
  standalone: true,
  imports: [MatCardModule,MatButtonModule, CommonModule, MatIconModule, MatDividerModule, PhotoresistorDataItemComponent, ProximityDataItemComponent],
  templateUrl: './bathrooms-page.component.html',
  styleUrl: './bathrooms-page.component.scss'
})
export class BathroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined =[];
  public actuatorsData: iActuatorsData[] | undefined =[];
  public bathroomName: string | null="";

  public ldrData: iSensorsData | null = null;
  public presenceData: iSensorsData | null = null;
  public proximityData: iSensorsData | null = null;
  public doorData: iActuatorsData | null = null;
  public inLightData: iActuatorsData | null = null;
  public exLightData: iActuatorsData | null = null;
  public waterPumpData: iActuatorsData | null = null;

  constructor(
    private bathroomsService: BathroomsService,
    private route: ActivatedRoute,
    private loadinService: LoadingService
  ) { 

  }
  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params) =>{
          this.bathroomName = params.get('location');
          this.getBathroomsData(this.bathroomName!)
        }
      )
  }
  getBathroomsData(location: string){
    this.loadinService.showLoading()
    this.bathroomsService.getBathroomsData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;

        if(this.actuatorsData && this.sensorsData){
          this.ldrData = this.sensorsData.find(sensor => sensor.name === 'Fotorresistencia')!;
          this.presenceData = this.sensorsData.find(sensor => sensor.name === 'Presencia')!;
          this.proximityData = this.sensorsData.find(sensor => sensor.name === 'Proximidad')!;
          
          this.doorData = this.actuatorsData.find(actuator => actuator.name === 'Servomotor Puerta')!;
          this.inLightData = this.actuatorsData.find(actuator => actuator.name === 'Led Interior')!;
          this.exLightData = this.actuatorsData.find(actuator => actuator.name === 'Led Exterior')!;
          this.waterPumpData = this.actuatorsData.find(actuator => actuator.name === 'Mini Bomba de Agua Sumergible')!;
        }

        this.loadinService.hideLoading();
      }, (error) => {
        this.loadinService.hideLoading();
        console.error(error);
      }
    )
  }
}

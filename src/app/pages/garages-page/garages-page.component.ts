import { Component, OnInit } from '@angular/core';
import { GaragesService } from '../../core/services/Garages/garages.service';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';

@Component({
  selector: 'app-garages-page',
  standalone:true,
  imports:[],
  templateUrl: './garages-page.component.html',
  styleUrls: ['./garages-page.component.scss']
})
export class GaragesPageComponent implements OnInit {
  constructor(
    private garagesService: GaragesService) {
    }

    public garagesSensor: iSensorsData[] | undefined = [];
    public garagesActuators: iActuatorsData[] | undefined = [];


  ngOnInit(): void {
    this.getAll();

  }
  getAll() {
    this.garagesService.getAllGarages().subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.garagesActuators = response.actuatorsData;
        this.garagesSensor = response.sensorsData;
      }
    );
  }
}

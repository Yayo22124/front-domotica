import { Component, OnInit } from '@angular/core';
import { BathroomsService } from '../../core/services/Bathrooms/bathrooms.service';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';

@Component({
  selector: 'app-bathrooms-page',
  standalone: true,
  imports: [],
  templateUrl: './bathrooms-page.component.html',
  styleUrl: './bathrooms-page.component.scss'
})
export class BathroomsPageComponent implements OnInit {
  constructor(
    private bathroomsService: BathroomsService
  ) {

  }

  public bathroomsSensors: iSensorsData[] | undefined = [];
  public bathroomsActuators: iActuatorsData[] | undefined = [];

  ngOnInit(): void {
      this.getAll();
  }

  getAll() {
    this.bathroomsService.getAllDataBathrooms().subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.bathroomsActuators = response.actuatorsData;
        this.bathroomsSensors = response.sensorsData;
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { BedroomsService } from '../../core/services/Bedrooms/bedrooms.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iBedroom } from '../../core/interfaces/i-Bedroom.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-bedrooms-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './bedrooms-page.component.html',
  styleUrl: './bedrooms-page.component.scss'
})
export class BedroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];  
  public actuatorsData: iActuatorsData[] | undefined = [];  
  public bedroomName: string | null = "";

  constructor(
    private bedroomsService: BedroomsService,
    private route: ActivatedRoute,
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
    this.bedroomsService.getBedroomData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;
      }
    )
  }

}

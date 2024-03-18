import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { KitchensService } from '../../core/services/kitchens/kitchens.service';

@Component({
  selector: 'app-kitchens-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './kitchens-page.component.html',
  styleUrl: './kitchens-page.component.scss'
})
export class KitchensPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined = [];  
  public actuatorsData: iActuatorsData[] | undefined = [];  
  public kitchenName: string | null = "";

  constructor(
    private KitchensService: KitchensService,
    private route: ActivatedRoute,
  ) {
    
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(
      (params) => {
        this.kitchenName = params.get('location');

        this.getKitchenData(this.kitchenName!)
      }
    )
  }

  getKitchenData(location: string) {
    this.KitchensService.getKitchenData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;
      }
    )
  }

}


// Sensores : Gas, temperatura y *----fotoresistencia----* 
// Actuadores :  Ventilador, 3 servomotor (puerta, 2 ventanas), buzzer, 2 leds  
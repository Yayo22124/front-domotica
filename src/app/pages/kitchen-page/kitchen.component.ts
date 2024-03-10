import { Component, OnInit } from '@angular/core';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { KitchensService } from '../../core/services/kitchens/kitchens.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kitchens-page',
  standalone:true,
  imports:[MatCardModule, MatButtonModule],
  templateUrl: './kitchens-page.component.html',
  styleUrls: ['./kitchens-page.component.scss']
})
export class KitchenPageComponent implements OnInit {
  constructor(
    private KitchensService: KitchensService, 
    private route: ActivatedRoute) {
    }

    public KitchenSensor: iSensorsData[] | undefined = [];
    public KitchenActuators: iActuatorsData[] | undefined = [];
    public KitchenName: string | null = "";

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) =>  {
        this.KitchenName = params.get('location');
        this.getKitchenData(this.KitchenName!)
      }
    )
  }
  getKitchenData(location: string) {
    this.KitchensService.getKitchenData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.KitchenActuators = response.actuatorsData;
        this.KitchenSensor = response.sensorsData;
      }
    );
  }
}

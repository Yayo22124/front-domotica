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
@Component({
  selector: 'app-bathrooms-page',
  standalone: true,
  imports: [MatCardModule,MatButtonModule],
  templateUrl: './bathrooms-page.component.html',
  styleUrl: './bathrooms-page.component.scss'
})
export class BathroomsPageComponent implements OnInit {
  public sensorsData: iSensorsData[] | undefined =[];
  public actuatorsData: iActuatorsData[] | undefined =[];
  public bathroomName: string | null="";
  constructor(
    private bathroomsService: BathroomsService,
    private route: ActivatedRoute,
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
    this.bathroomsService.getBathroomsData(location).subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.actuatorsData = response.actuatorsData;
        this.sensorsData = response.sensorsData;
      }
    )
  }
}

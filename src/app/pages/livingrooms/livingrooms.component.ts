import { ActivatedRoute } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { LivingroomsService } from './../../core/services/Livingrooms/livingrooms.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-livingrooms',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './livingrooms.component.html',
  styleUrl: './livingrooms.component.scss'
})
export class LivingroomsComponent implements OnInit {
  constructor(
    private LivingroomsService: LivingroomsService,
    private route : ActivatedRoute
  ){

  }

  public livingroomsSensor: iSensorsData[] | undefined= [];
  public livingroomsActuators: iActuatorsData[]  | undefined= [];
  public livingroomName : string | null = "";

  ngOnInit(): void {
      this.route.paramMap.subscribe(
        (params)=>{
          this.livingroomName = params.get('location');

          this.getLivingroomData(this.livingroomName!);
        }
      )
  }

  getLivingroomData(location: string){
    this.LivingroomsService.getLivingroomData(location).subscribe(
      (response: iApiResponse) =>{
        console.log(response);
        this.livingroomsActuators = response.actuatorsData;
        this.livingroomsSensor = response.sensorsData;
      }
    );
  }
}

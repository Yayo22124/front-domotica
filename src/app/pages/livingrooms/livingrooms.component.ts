import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';
import { LivingroomsService } from './../../core/services/Livingrooms/livingrooms.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livingrooms',
  standalone: true,
  imports: [],
  templateUrl: './livingrooms.component.html',
  styleUrl: './livingrooms.component.scss'
})
export class LivingroomsComponent implements OnInit {
  constructor(
    private LivingroomsService: LivingroomsService
  ){

  }

  public livingroomsSensor: iSensorsData[] | undefined= [];
  public livingroomsActuators: iActuatorsData[]  | undefined= [];

  ngOnInit(): void {
      this.getAll();
  }

  getAll(){
    this.LivingroomsService.getAllLivingrooms().subscribe(
      (response: iApiResponse) =>{
        console.log(response);
        this.livingroomsActuators = response.actuatorsData;
        this.livingroomsSensor = response.sensorsData;
      }
    );
  }
}

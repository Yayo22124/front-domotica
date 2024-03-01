import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { iBedroom } from '../../core/interfaces/i-Bedroom.interface';

@Component({
  selector: 'app-bedrooms',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './bedrooms.component.html',
  styleUrl: './bedrooms.component.scss',
})
export class BedroomsComponent {
  public dataSensors = [
    {
      id: 1,
      name: 'PIR',
      description: 'Sensor de presencia',
      location: 'Recámara1',
      sensors: [{
        name: "Presencia detectada",
        date: new Date()
      }],
      status: true,
    },
    {
      id: 2,
      name: 'PIR',
      description: 'Sensor de presencia',
      location: 'Recámara1',
      sensors: [{
        name: "Presencia detectada",
        date: new Date()
      }],
      status: true,
    },
    {
      id: 3,
      name: 'Servo',
      description: 'Sensor de presencia',
      location: 'Recámara1',
      actuators: [{
        name: "Servo movido",
        date: new Date()
      }],
      status: true,
    },
    {
      id: 4,
      name: 'DHT11',
      description: 'Sensor de temperatura',
      location: 'Recámara1',
      sensors: [{
        name: "Deteccion de temperatura",
        value: 24.5
      }],
      status: true,
    },
  ];
}

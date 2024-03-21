import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  standalone: true,
  selector: 'app-sensor-information-page',
  imports: [MatTableModule, HighchartsChartModule, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './sensor-information-page.component.html',
  styleUrls: ['./sensor-information-page.component.scss'],
})
export class SensorInformationPageComponent implements OnInit {
  displayedColumns: string[] = ['registro', 'ubicacion', 'estatus', 'lecturas', 'fecha']; // Definir las columnas a mostrar

  dataSource = new MatTableDataSource<iSensorsData | iActuatorsData>(); // DataSource para la tabla
  sensorName: string = '';
  roomName: string = '';

  constructor(
    private roomsService: RoomsService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.sensorName = params.get('sensorName') || '';
      this.roomName = params.get('location') || '';
      this.getSensorRecords(
        params.get('location') || '',
        params.get('room') || '',
        params.get('sensorName') || ''
      );
    });
    
  }
  
  getSensorRecords(location: string, room: string, sensorName: string) {
    this.loadingService.showLoading();
    this.roomsService.getSensorRecords(location, room, sensorName).subscribe(
      (res) => {
        console.log(res);
        this.dataSource.data = res.records; // Asignar los datos al dataSource
        this.loadingService.hideLoading();
      },
      (error) => {
        console.error(error);
        this.loadingService.hideLoading();
      }
    );
  }

  getReadings(record: iSensorsData): any {
    let readings: string = '';
    if (record.readings.length > 0) {
      return record.readings
        .map((read) => `${read.value} ${read.measurementUnit}`)
        .join(', ');
    }
    return record.readings.map(
      (read) => `${read.value}, ${read.measurementUnit}.`
    );
  }
  
  goBack() {
    this.location.back()
  }
}

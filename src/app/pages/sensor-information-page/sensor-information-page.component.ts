import * as Highcharts from 'highcharts';

import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { ActivatedRoute } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { SensorChartComponent } from '../../components/sensor-chart/sensor-chart.component';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  standalone: true,
  selector: 'app-sensor-information-page',
  imports: [
    MatTableModule,
    HighchartsChartModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    SensorChartComponent,
  ],
  templateUrl: './sensor-information-page.component.html',
  styleUrls: ['./sensor-information-page.component.scss'],
})
export class SensorInformationPageComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions!: Highcharts.Options;

  displayedColumns: string[] = [
    'registro',
    'ubicacion',
    'estatus',
    'lecturas',
    'fecha',
  ]; // Definir las columnas a mostrar

  dataSource = new MatTableDataSource<iSensorsData | iActuatorsData>(); // DataSource para la tabla
  sensorName: string = '';
  roomName: string = '';
  specifications: any[] = [];
  records: iSensorsData[] = [];

  private roomsService = inject(RoomsService);
  private route = inject(ActivatedRoute);
  private loadingService = inject(LoadingService);
  private location = inject(Location);

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
        this.specifications = res.records[0].specifications;
        this.records = res.records;
        
        this.getCharts();
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
    if (record.readings.length > 1) {
      return record.readings
      .map((read) => `${read.value} ${read.measurementUnit}`)
      .join(', ');
    }
    return record.readings.map((read) => {
      if (read.measurementUnit) {
        return `${read.value}, ${read.measurementUnit}.`;
      }
      return `${read.value}`;
    });
  }
  
  getCharts() {
    if (this.sensorName.toLocaleLowerCase().includes("temperatura")) {
      this.chartOptions = {
        title: {
          text: 'Temperatura y Humedad',
        },
        series: [
          {
            type: 'spline',
            name: 'Temperatura',
            color: "#10b981",
            data: this.records.map((record, index) => {
              return {
                x: index,
                y: record.readings[0].value,
                name: 'Detección de Temperatura',
                color: "#059669"
              };
            }),
          },
          {
            type: 'spline',
            name: 'Humedad',
            color: "#475569",
            data: this.records.map((record, index) => {
              return {
                x: index,
                y: record.readings[1].value,
                color: "#0f172a",
                name: 'Detección de Humedad',
              };
            }),
          },
        ],
      };  
    } else {
      this.chartOptions = {
        title: {
          text: this.records[0].name,
        },
        series: [
          {
            type: 'line',
            color: "#10b981",
            data: this.records.map((record, index) => {
              return {
                x: index,
                color: "#059669",
                y: record.readings[0].value,
                name: record.name,
              };
            }),
          },
        ],
      };
    }

  }

  goBack() {
    this.location.back();
  }
}

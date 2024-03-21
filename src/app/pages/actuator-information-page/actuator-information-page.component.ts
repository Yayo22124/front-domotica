import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

@Component({
  selector: 'app-actuator-information-page',
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
  templateUrl: './actuator-information-page.component.html',
  styleUrl: './actuator-information-page.component.scss'
})
export class ActuatorInformationPageComponent {

}

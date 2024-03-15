import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-temperature-data-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './temperature-data-item.component.html',
  styleUrl: './temperature-data-item.component.scss'
})
export class TemperatureDataItemComponent {
  @Input("dht-data") dhtData: iSensorsData | null = null;
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
@Component({
  selector: 'app-fan-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './fan-data-item.component.html',
  styleUrl: './fan-data-item.component.scss'
})
export class FanDataItemComponent {
  @Input("fan-data") fanData:
  iActuatorsData | null = null;
}

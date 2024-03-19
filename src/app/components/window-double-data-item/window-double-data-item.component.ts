import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
@Component({
  selector: 'app-window-double-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './window-double-data-item.component.html',
  styleUrl: './window-double-data-item.component.scss'
})
export class WindowDoubleDataItemComponent {
  @Input("windowDL-data") windowDLData : iActuatorsData | null = null;
  @Input("windowDR-data") windowDRData : iActuatorsData | null = null;
}

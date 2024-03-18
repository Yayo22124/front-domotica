import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-in-light-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './in-light-data-item.component.html',
  styleUrl: './in-light-data-item.component.scss'
})
export class InLightDataItemComponent {
  @Input("inlight-data") inLightData : iActuatorsData | null = null;
}

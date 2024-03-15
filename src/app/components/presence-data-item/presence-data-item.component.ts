import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';

@Component({
  selector: 'app-presence-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './presence-data-item.component.html',
  styleUrl: './presence-data-item.component.scss'
})
export class PresenceDataItemComponent {
@Input("presence-data") presenceData: iSensorsData | null = null;
}

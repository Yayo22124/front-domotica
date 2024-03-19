import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-buzzer-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './buzzer-data-item.component.html',
  styleUrl: './buzzer-data-item.component.scss'
})
export class BuzzerDataItemComponent {
  @Input("buzzer-data") buzzerData: iActuatorsData | null = null; 
}
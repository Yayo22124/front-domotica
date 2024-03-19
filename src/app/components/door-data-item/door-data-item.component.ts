import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-door-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggle],
  templateUrl: './door-data-item.component.html',
  styleUrl: './door-data-item.component.scss'
})
export class DoorDataItemComponent {
  @Input("door-data") doorData: iActuatorsData | null = null;
}

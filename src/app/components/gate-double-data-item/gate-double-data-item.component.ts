import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
@Component({
  selector: 'app-gate-double-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule],
  templateUrl: './gate-double-data-item.component.html',
  styleUrl: './gate-double-data-item.component.scss'
})
export class GateDoubleDataItemComponent {
  @Input("gateLeft-data") gateLeftData : iActuatorsData | null = null;
  @Input("gateRight-data") gateRightData : iActuatorsData | null = null;
}

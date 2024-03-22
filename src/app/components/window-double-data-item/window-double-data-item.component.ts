import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
@Component({
  selector: 'app-window-double-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule, FontAwesomeModule],
  templateUrl: './window-double-data-item.component.html',
  styleUrl: './window-double-data-item.component.scss'
})
export class WindowDoubleDataItemComponent {

  constructor(private router: Router) {}

  @Input("windowDL-data") windowDLData : iActuatorsData | null = null;
  @Input("windowDR-data") windowDRData : iActuatorsData | null = null;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  seeMore() {
    this.router.navigate([
      `${this.componentRoomName}/actuator/${this.componentLocation}/${this.componentName}`,
    ]);
  }
}

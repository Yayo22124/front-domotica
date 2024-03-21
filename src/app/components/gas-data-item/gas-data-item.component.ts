import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iSensorsData } from '../../core/interfaces/iSensorsData.interface';


@Component({
  selector: 'app-gas-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './gas-data-item.component.html',
  styleUrl: './gas-data-item.component.scss'
})
export class GasDataItemComponent {

  constructor(private router: Router) {}

  @Input("gas-data") gasData: iSensorsData | null = null; 

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  seeMore() {
    this.router.navigate([
      `${this.componentRoomName}/sensor/${this.componentLocation}/${this.componentName}`,
    ]);
  }

} 
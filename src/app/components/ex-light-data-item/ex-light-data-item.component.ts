import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex-light-data-item',
  standalone: true,
  imports: [MatCardModule,MatTooltipModule,MatButtonModule,MatIconModule,CommonModule,MatSlideToggleModule],
  templateUrl: './ex-light-data-item.component.html',
  styleUrl: './ex-light-data-item.component.scss'
})
export class ExLightDataItemComponent {

  constructor(private router: Router) {}

  @Input("exlight-data") exLightData : iActuatorsData | null = null;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  seeMore() {
    this.router.navigate([
      `${this.componentRoomName}/actuator/${this.componentLocation}/${this.componentName}`,
    ]);
  }
  
}

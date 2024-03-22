import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-water-pump-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './water-pump-data-item.component.html',
  styleUrl: './water-pump-data-item.component.scss',
})
export class WaterPumpDataItemComponent {
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);
  private componentService = inject(ComponentControlService);

  @Input('waterPump') waterPumpData: iActuatorsData | null = null;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  @Output('actuator-updated') actuatorUpdated: EventEmitter<void> =
    new EventEmitter<void>();

  seeMore() {
    this.router.navigate([
      `${this.componentRoomName}/actuator/${this.componentLocation}/${this.componentName}`,
    ]);
  }

  public isLoading: boolean = false;

  waterOff(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.lightOff(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Luz Apagada Correctamente', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Error al Apagar la Luz', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
  waterOn(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.lightOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Luz Encendida Correctamente', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Error al Encender la Luz', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
}

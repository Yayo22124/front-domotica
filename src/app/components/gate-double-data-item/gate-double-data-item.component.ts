import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-gate-double-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
  ],
  templateUrl: './gate-double-data-item.component.html',
  styleUrl: './gate-double-data-item.component.scss',
})
export class GateDoubleDataItemComponent {
  private router = inject(Router);
  private loadingService = inject(LoadingService);
  private componentService = inject(ComponentControlService);
  private _snackbar = inject(MatSnackBar);

  @Input('gateLeft-data') gateLeftData: iActuatorsData | null = null;
  @Input('gateRight-data') gateRightData: iActuatorsData | null = null;

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

  closePorton(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.doorClose(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Porton Cerrado Correctamente', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Error al Cerrar al Porton', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
  openPorton(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.doorOpen(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Porton Abierto Correctamente', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        this._snackbar.open('Error al Abrir el Porton', 'Cerrar', {
          duration: 2.5 * 1000,
        });
      }
    );
  }
}

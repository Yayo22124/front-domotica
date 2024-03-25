import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-simple-window',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatButtonModule, MatSlideToggleModule, MatButtonModule, MatIconModule],
  templateUrl: './simple-window.component.html',
  styleUrl: './simple-window.component.scss',
})
export class SimpleWindowComponent {
  private router = inject(Router);
  private componentsService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;

  @Input('window-data') windowData: iActuatorsData | null = null;

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

  openWindow(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Ventana Abierta Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentsService.simpleWindowOpen(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Abrir Ventana', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
  closeWindow(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Ventana Cerrada Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentsService.simpleWindowClose(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Cerrar Ventana', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
}

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-window-double-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatSnackBarModule,
  ],
  templateUrl: './window-double-data-item.component.html',
  styleUrl: './window-double-data-item.component.scss',
})
export class WindowDoubleDataItemComponent {
  private router = inject(Router);
  private componentsService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;

  @Input('windowDL-data') windowDLData: iActuatorsData | null = null;
  @Input('windowDR-data') windowDRData: iActuatorsData | null = null;

  @Input('windowDLL-data') windowDLLData: iActuatorsData | null = null;
  @Input('windowDRL-data') windowDRLData: iActuatorsData | null = null;

  @Input('windowDLR-data') windowDLRData: iActuatorsData | null = null;
  @Input('windowDRR-data') windowDRRData: iActuatorsData | null = null;

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

  openWindows(arduinoIp: string, location: 'R' | 'L' | null = null): any {
    this.isLoading = true;
    this.loadingService.showLoading();
    if (!location) {
      this._snackbar.open('Ventana Doble Abierta Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsOpen(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Cerrar Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      );
    } else if (location === 'R') {
      this._snackbar.open('Ventana Doble Derecha Abierta Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsRightOpen(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Cerrar Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      );
    } else if (location === 'L') {
      this._snackbar.open('Ventana Doble Izquierda Abierta Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsLeftOpen(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Cerrar Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      );

    }
  }
  closeWindows(arduinoIp: string, location: 'R' | 'L' | null = null) {
    this.isLoading = true;
    this.loadingService.showLoading();
    if (!location) {
      this._snackbar.open('Ventana Doble Cerrada Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsClose(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Abrir Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      );
    } else if (location === 'L') {
      this._snackbar.open('Ventana Doble Izquierda Cerrada Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsLeftClose(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Abrir Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      ); 
    
    } else if (location === 'R') {
      this._snackbar.open('Ventana Doble Derecha Cerrada Correctamente', 'Cerrar', {
        duration: 2.5 * 1000,
      });
      this.componentsService.doubleWindowsRightClose(arduinoIp).subscribe(
        (res) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
        },
        (err) => {
          this.loadingService.hideLoading();
          this.isLoading = false;
          this.actuatorUpdated.emit();
          // this._snackbar.open('Error al Abrir Ventana Doble', 'Cerrar', {
          //   duration: 2.5 * 1000,
          // });
        }
      ); 
    }
  }
}

import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-ex-light-data-item',
  standalone: true,
  imports: [
    MatCardModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatSlideToggleModule,
    MatCheckboxModule,
  ],
  templateUrl: './ex-light-data-item.component.html',
  styleUrl: './ex-light-data-item.component.scss',
})
export class ExLightDataItemComponent {
  private router = inject(Router);
  private componentService = inject(ComponentControlService);
  private loadingService = inject(LoadingService);
  private _snackbar = inject(MatSnackBar);

  public isLoading: boolean = false;
  public isChecked: boolean = false;

  @Input('exlight-data') exLightData: iActuatorsData | null = null;

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

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.isChecked
      ? this.controlOn(this.exLightData!.arduinoIp)
      : this.controlOff(this.exLightData!.arduinoIp);
  }

  controlOff(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Exterior Automática Desactivada', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.controlOff(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open(
        //   'Error al Desactivar la Luz Exterior Automática',
        //   'Cerrar',
        //   {
        //     duration: 2.5 * 1000,
        //   }
        // );
      }
    );
  }
  controlOn(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Exterior Encendida Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.controlOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Encender la Luz Exterior', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }

  lightOff(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Exterior Apagada Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.lightOutOff(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Apagar la Luz', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
  lightOn(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Luz Exterior Encendida Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.lightOutOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Encender la Luz', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }
}

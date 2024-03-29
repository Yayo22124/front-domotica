import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';

@Component({
  selector: 'app-fan-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule, MatSnackBarModule, MatCheckboxModule],
  templateUrl: './fan-data-item.component.html',
  styleUrl: './fan-data-item.component.scss'
})
export class FanDataItemComponent {

  constructor(
    private componentService: ComponentControlService, 
    private loadingService: LoadingService, 
    private _snackbar: MatSnackBar,
    private router: Router) {
    
  }

  @Input("fan-data") fanData: iActuatorsData | null = null;

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

  public isChecked: boolean = false;
  public isLoading: boolean = false;

  onCheckboxChange() {
    this.isChecked = !this.isChecked;
    this.isChecked ? this.controlOn(this.fanData!.arduinoIp) : this.controlOff(this.fanData!.arduinoIp);
  }

  controlOff(arduinoIp: string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this._snackbar.open('Ventilador Manual Desctivado', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.controlFOff(arduinoIp).subscribe(
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
        //   'Error al Desactivar el modo Manual del Ventilador.',
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
    this._snackbar.open('Modo Manual del Ventilador Activado Correctamente', 'Cerrar', {
      duration: 2.5 * 1000,
    });
    this.componentService.controlFOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open('Error al Activar el Modo Manual del Ventilador', 'Cerrar', {
        //   duration: 2.5 * 1000,
        // });
      }
    );
  }

  fanOn(arduinoIp:string){
    this.isLoading=true;
    this.loadingService.showLoading();
    this._snackbar.open("Ventilador Encendido", "Cerrar", {
      duration: 2.5*1000
    });
    this.componentService.fanOn(arduinoIp).subscribe(
      (res)=>{
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open("Error al apagar el Ventilador", "Cerrar", {
        //   duration: 2.5*1000
        // });
      }
    )
  }
  fanOff(arduinoIp:string){
    this.isLoading=true;
    this.loadingService.showLoading();
    this._snackbar.open("Ventilador Apagado", "Cerrar", {
      duration: 2.5*1000
    });
    this.componentService.fanOff(arduinoIp).subscribe(
      (res)=>{
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this.actuatorUpdated.emit();
        // this._snackbar.open("Error al apagar el Ventilador", "Cerrar", {
        //   duration: 2.5*1000
        // });
      }
    )
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  selector: 'app-door-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule,CommonModule, MatSlideToggleModule, MatSnackBarModule],
  templateUrl: './door-data-item.component.html',
  styleUrl: './door-data-item.component.scss'
})
export class DoorDataItemComponent {
  constructor(private componentService: ComponentControlService, private loadingService: LoadingService, private _snackbar: MatSnackBar) {

  }
  @Input("door-data") doorData : iActuatorsData | null = null;
  public isLoading: boolean = false;

  turnOff(arduinoIp:string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.doorClose(arduinoIp).subscribe(
      (res) => {        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Puerta cerrada", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al cerrar la puerta", "Cerrar", {
          duration: 2.5*1000
        });
      }
      )
    }
    turnOn(arduinoIp:string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.doorOpen(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Puerta abierta correctamente", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al cerrar la pueta", "Cerrar", {
          duration: 2.5*1000
        });
      }
    )
    
  }
}

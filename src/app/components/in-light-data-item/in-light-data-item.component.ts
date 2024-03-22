import { Component, Input } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

import { CommonModule } from '@angular/common';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-in-light-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule, MatSnackBarModule],
  templateUrl: './in-light-data-item.component.html',
  styleUrl: './in-light-data-item.component.scss'
})
export class InLightDataItemComponent {
  constructor(private componentService: ComponentControlService, private loadingService: LoadingService, private _snackbar: MatSnackBar, private router: Router) {
    
  }
  @Input("inlight-data") inLightData : iActuatorsData | null = null;

  @Input('component-room-name') componentRoomName: string | null = null;
  @Input('component-location') componentLocation: string | null = null;
  @Input('component-name') componentName: string | null = null;

  seeMore() {
    this.router.navigate([
      `${this.componentRoomName}/actuator/${this.componentLocation}/${this.componentName}`,
    ]);
  }

  public isLoading: boolean = false;

  turnOff(arduinoIp:string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.lightOff(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Luz Apagada Correctamente", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al Apagar la Luz", "Cerrar", {
          duration: 2.5*1000
        });
      }
      )
    }
    turnOn(arduinoIp:string) {
    this.isLoading = true;
    this.loadingService.showLoading();
    this.componentService.lightOn(arduinoIp).subscribe(
      (res) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Luz Encendida Correctamente", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al Encender la Luz", "Cerrar", {
          duration: 2.5*1000
        });
      }
    )
    
  }
}

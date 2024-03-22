import { Component, Input } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


import { iActuatorsData } from '../../core/interfaces/i-ActuatorsData.interface';
import { ComponentControlService } from '../../core/services/ComponentControl/component-control.service';
import { LoadingService } from '../../core/services/Loading/loading.service';
@Component({
  selector: 'app-fan-data-item',
  standalone: true,
  imports: [MatCardModule, MatTooltipModule, MatButtonModule, MatIconModule, CommonModule, MatSlideToggleModule, MatSnackBarModule],
  templateUrl: './fan-data-item.component.html',
  styleUrl: './fan-data-item.component.scss'
})
export class FanDataItemComponent {

  constructor(
    private componentService: ComponentControlService, 
    private loadingService: LoadingService, 
    private _snackbar: MatSnackBar) {
    
  }

  @Input("fan-data") fanData: iActuatorsData | null = null;
  public isLoading: boolean = false;

  fanOn(arduinoIp:string){
    this.isLoading=true;
    this.loadingService.showLoading();
    this.componentService.fanOn(arduinoIp).subscribe(
      (res)=>{
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Ventilador Encendido", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al apagar el Ventilador", "Cerrar", {
          duration: 2.5*1000
        });
      }
    )
  }
  fanOff(arduinoIp:string){
    this.isLoading=true;
    this.loadingService.showLoading();
    this.componentService.fanOff(arduinoIp).subscribe(
      (res)=>{
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Ventilador Apagado", "Cerrar", {
          duration: 2.5*1000
        });
      },
      (err) => {
        this.loadingService.hideLoading();
        this.isLoading = false;
        this._snackbar.open("Error al apagar el Ventilador", "Cerrar", {
          duration: 2.5*1000
        });
      }
    )
  }
}

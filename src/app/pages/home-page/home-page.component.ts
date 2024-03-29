import { Component, OnInit } from '@angular/core';

import { LoadingService } from '../../core/services/Loading/loading.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { RouterLink } from '@angular/router';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';
import { pollingIntervalTime } from '../../core/constants/pollingInterval';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(
    private roomsService: RoomsService,
    private loadingService: LoadingService
  ) {}
  public rooms: any = {};

  private pollingInterval: any;


  ngOnInit(): void {
    this.getRoomsNames();
    
    this.pollingInterval = setInterval(() => {
      this.getRoomsNames();
    }, pollingIntervalTime);
  }

  ngOnDestroy(): void {
    clearInterval(this.pollingInterval);
  }

  getRoomsNames() {
    this.loadingService.showLoading();
    this.roomsService.getAllRooms().subscribe((res: iApiResponse) => {
      console.log(res);
      this.rooms = res.roomsNames;
      this.loadingService.hideLoading();
    });
  }
}

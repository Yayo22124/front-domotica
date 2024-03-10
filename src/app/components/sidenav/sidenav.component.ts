import { Component, OnChanges, OnInit } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RoomsService } from '../../core/services/Rooms/rooms.service';
import { RouterLink } from '@angular/router';
import { SidenavGridItemComponent } from '../sidenav-grid-item/sidenav-grid-item.component';
import { iApiResponse } from '../../core/interfaces/i-ApiResponse';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SidenavGridItemComponent, MatDividerModule, RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit{
  public rooms: any = {};
  constructor(
    private roomsService: RoomsService
  ) {
    
  }

  ngOnInit(): void {
    this.getRoomsNames();
  }

  getRoomsNames() {
    this.roomsService.getAllRooms().subscribe(
      (response: iApiResponse) => {
        console.log(response);
        this.rooms = response.roomsNames;
      }
    );
  }
}

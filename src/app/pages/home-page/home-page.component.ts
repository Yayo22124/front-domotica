import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { RoomsService } from '../../core/services/Rooms/rooms.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  constructor(
    private roomsService: RoomsService
  ) {
    
  }
  public rooms: any = {};

  ngOnInit(): void {
    
  }

  getRoomsNames() {
    this.roomsService.getAllRooms().subscribe((res) => this.rooms = res.roomsNames)
  }

}

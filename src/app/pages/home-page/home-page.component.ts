import { Component, OnInit } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { RoomsService } from '../../core/services/Rooms/rooms.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor(private roomsService: RoomsService) {}
  public rooms: any = {};

  ngOnInit(): void {
    this.getRoomsNames();
    console.log(this.rooms);
  }

  getRoomsNames() {
    this.roomsService.getAllRooms().subscribe((res) => {
      this.rooms = res.roomsNames;
    });
  }
}

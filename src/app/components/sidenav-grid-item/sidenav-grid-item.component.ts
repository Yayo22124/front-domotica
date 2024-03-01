import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-sidenav-grid-item',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './sidenav-grid-item.component.html',
  styleUrl: './sidenav-grid-item.component.scss'
})
export class SidenavGridItemComponent {

}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidenavGridItemComponent } from '../sidenav-grid-item/sidenav-grid-item.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, SidenavGridItemComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}

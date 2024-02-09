import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameContainerComponent } from './containers/game-container.component';
import { RoomService } from './services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GameContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'fe';
  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.roomService.loadRooms();
  }
}

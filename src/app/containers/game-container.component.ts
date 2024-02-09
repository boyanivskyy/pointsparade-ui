import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services/room.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Room } from '../models';

@Component({
  selector: 'app-game-container',
  imports: [CommonModule],
  template: `<h1>Rooms: {{ room$ | async | json }}</h1>`,
  standalone: true,
})
export class GameContainerComponent implements OnInit {
  room$!: Observable<Room | undefined>;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const roomId = this.route.snapshot.paramMap.get('id');

    if (roomId) {
      this.room$ = this.roomService.getRoom(roomId);
    }
  }
}

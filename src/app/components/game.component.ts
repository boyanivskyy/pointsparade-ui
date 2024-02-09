import { Component, Input } from '@angular/core';
import { Room } from '../models';

@Component({
  selector: 'app-room',
  template: `<h1>Room</h1>`,
  standalone: true,
})
export class RoomComponent {
  @Input({ required: true }) room!: Room;
}

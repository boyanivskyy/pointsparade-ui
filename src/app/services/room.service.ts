import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Room } from '../models';
import { RoomApiService } from '../api/room-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  rooms$: BehaviorSubject<Room[]> = new BehaviorSubject<Room[]>([]);
  constructor(private roomsApi: RoomApiService) {}

  loadRooms() {
    this.roomsApi.getRooms().subscribe(this.rooms$);
  }

  addRoom(name: string): void {
    this.roomsApi.createRoom(name).subscribe((room) => {
      const rooms = this.rooms$.getValue();
      this.rooms$.next([...rooms, room]);
    });
  }

  getRoom(id: string): Observable<Room | undefined> {
    return this.rooms$
      .asObservable()
      .pipe(map((rooms) => rooms.find((room) => room.id === id)));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoomApiService {
  constructor(private http: HttpClient) {}

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>('/room');
  }

  getRoom(id: string): Observable<Room> {
    return this.http.get<Room>(`/room/${id}`);
  }

  createRoom(name: string): Observable<Room> {
    return this.http.post<Room>('/room', { name });
  }

  updateRoom(room: Room): Observable<Room> {
    return this.http.put<Room>(`/room/${room.id}`, room);
  }

  deleteRoom(id: string): Observable<void> {
    return this.http.delete<void>(`/room/${id}`);
  }

  joinRoom(id: string): Observable<void> {
    return this.http.post<void>(`/room/${id}/join`, {});
  }

  leaveRoom(id: string): Observable<void> {
    return this.http.post<void>(`/room/${id}/leave`, {});
  }

  startGame(id: string): Observable<void> {
    return this.http.post<void>(`/room/${id}/start`, {});
  }

  endGame(id: string): Observable<void> {
    return this.http.post<void>(`/room/${id}/end`, {});
  }
}

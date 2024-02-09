import { Injectable } from '@angular/core';
import { RoomService } from './room.service';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user$ = new BehaviorSubject<string | null>(null);

  constructor(private roomService: RoomService, private toastr: ToastrService) {
    // TODO: probably user room service if user have enter the app with roomId
    if (this.checkIfUserExists()) {
      const user = this.getUser();
      this.setUser(user);
    }
  }

  setUser(user: string) {
    if (!user) {
      return;
    }

    this.user$.next(user);
    localStorage.setItem('user', user);
    this.toastr.success(`Welcome ${user}`);
  }

  private getUser(): string {
    return localStorage.getItem('user') || '';
  }

  private checkIfUserExists(): boolean {
    const user = this.getUser();

    return !!user;
  }
}

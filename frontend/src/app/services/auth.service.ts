import { Injectable } from '@angular/core';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userKey = 'currentUser';

  constructor() {}

  public login(user: User): void {
    sessionStorage.setItem(this.userKey, JSON.stringify(user));
  }

  public getCurrentUser(): User | null {
    const user = sessionStorage.getItem(this.userKey);
    return user ? JSON.parse(user) as User : null;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from '../utils/app-config';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = appConfig.BASE_URL;
  private userKey = 'currentUser';
  private userSubject = new Subject<User>();
  private user:User = {token:'',bookmark:[]}

  public constructor(private http: HttpClient) { }

  get CurrentUser$(){
    return this.userSubject.asObservable();
  }

  private async generetToken():Promise<string>{
    const observable = this.http.get<string>(`${this.baseUrl}/generateToken`);
    const token = await firstValueFrom(observable);
    return token;
  }

  public async login(user:User): Promise<void> {
    try {
      let sessionStorageData = sessionStorage.getItem(this.userKey);
      let loginUser =  sessionStorageData ? JSON.parse(sessionStorageData) as User : null;

      if (!loginUser?.token) {
        this.user.token = await this.generetToken()
        sessionStorage.setItem(this.userKey, JSON.stringify(this.user));
        this.userSubject.next(this.user)
      }else{
        this.userSubject.next(loginUser)
      }
    } catch (error) {
      console.log(error);
    }
  }
}

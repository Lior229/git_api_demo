import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../utils/app-config';
import { firstValueFrom, Observable } from 'rxjs';
import Repository from '../models/Repository';
import User from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public baseUrl = appConfig.BASE_URL;

    //DI
    public constructor(private http: HttpClient) { }

    //Search for git repository
    public async searchGitRepository(searchTerm:string, user:User):Promise<Repository[]>{
        // Set up the request headers with the token
        const headers = new HttpHeaders().set('Authorization', `Bearer ${user.token}`);
        // Make the HTTP GET request with the headers
        const observable = this.http.get<Repository[]>(`${this.baseUrl}/search/${searchTerm}`, { headers });
        const repositories = await firstValueFrom(observable);
        return repositories;
    }
}

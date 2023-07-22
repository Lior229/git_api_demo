import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appConfig } from '../utils/app-config';
import { firstValueFrom } from 'rxjs';
import Repository from '../models/Repository';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    public baseUrl = appConfig.BASE_URL;

    //DI
    public constructor(private http: HttpClient) { }

    //Search for git repository
    public async searchGitRepository(searchTerm:string):Promise<Repository[]>{
        const observable = this.http.get<Repository[]>(`${this.baseUrl}/search/${searchTerm}`);
        const repositories = await firstValueFrom(observable);
        return repositories;
    }

    public async generetToken():Promise<string>{
        const observable = this.http.get<string>(`${this.baseUrl}/generateToken`);
        const token = await firstValueFrom(observable);
        return token;
    }
}

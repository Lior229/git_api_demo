import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService} from './services/data.service'
import { AuthService } from './services/auth.service';
import Repository from './models/Repository';
import User from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'git_api_demo';
  public reposetories:Repository[] = [];
  public user:User = {token:'',bookmark:[]}

  public constructor(private dataService:DataService, private authService: AuthService ){
  }

  async ngOnInit(): Promise<void> {
    if (!this.authService.getCurrentUser()) {
      try {
        this.user.token = await this.dataService.generetToken(); 
        this.authService.login(this.user)
       }catch(err:any){
        console.log(err.message)
       }
    }
  }

  @ViewChild('textToSearchRef', {static:true})
  textToSearchRef!:ElementRef<HTMLInputElement>

  public async searchReposetory():Promise<void>{
    try {
      console.log("searchReposetory",this.user);
      
      this.reposetories = await this.dataService.searchGitRepository(this.textToSearchRef.nativeElement.value,this.user)
      console.log(this.reposetories);
     }catch(err:any){
      console.log(err.message)
     }
  }
  
}

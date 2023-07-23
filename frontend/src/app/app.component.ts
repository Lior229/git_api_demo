import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
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
  private user:User = {token:'',bookmark:[]};
  
  @Output() reposetories:Repository[] = [];

  @ViewChild('textToSearchRef', {static:true})
  textToSearchRef!:ElementRef<HTMLInputElement>

  public constructor(private dataService:DataService, private authService: AuthService ){
  }

  async ngOnInit(): Promise<void> {
    if (!this.user.token) {
      try {
        this.authService.CurrentUser$.subscribe((loginUser:User)=>{
          this.user = loginUser;
        });
        this.authService.login(this.user)
       }catch(err:any){
        console.log(err.message)
       }
    }
  }

  public async searchReposetory():Promise<void>{
    try {
      this.reposetories = await this.dataService.searchGitRepository(this.textToSearchRef.nativeElement.value,this.user)
     }catch(err:any){
      console.log(err.message)
     }
  }
  
}

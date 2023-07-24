import { Component, OnInit, Output } from '@angular/core';
import { DataService} from '../../services/data.service'
import { AuthService } from '../../services/auth.service';
import User from 'src/app/models/User';
import Repository from 'src/app/models/Repository';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit{
  private user:User = {token:'',bookmark:[]};
  isLoading = false
  textToSearch =""
  @Output() reposetories:Repository[] = [];

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

  public async search():Promise<void>{
    if (this.textToSearch.length > 0) {
      this.reposetories = [];
      this.isLoading = true;
      try {
          await this.searchReposetory()
          this.isLoading = false      
       }catch(err:any){
        console.log(err.message)
       } 
    }
  }

  private async searchReposetory():Promise<void>{
    try {
      this.reposetories = await this.dataService.searchGitRepository(this.textToSearch,this.user)  
     }catch(err:any){
      console.log(err.message)
     }
  }

}

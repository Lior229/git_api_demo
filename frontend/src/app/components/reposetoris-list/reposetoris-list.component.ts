import { Component, Input, OnInit } from '@angular/core';
import Repository from '../../models/Repository';
import User from 'src/app/models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reposetoris-list',
  templateUrl: './reposetoris-list.component.html',
  styleUrls: ['./reposetoris-list.component.scss']
})

export class ReposetorisListComponent implements OnInit{
  @Input() repositoriesList:Repository[] = [];
  private user:User = {token:'',bookmark:[]};
  bookmarkId = 0
  
  public constructor(private authService: AuthService ){
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

  public bookmark(repositoryId:string) {
    const repository = this.repositoriesList.find((repo)=>{return repo.id === repositoryId})
    if (repository) {
      this.authService.addBookmark(repository)
    }
  }
}

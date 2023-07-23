import { Component, Input, OnInit } from '@angular/core';
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
  private user = {token:'',bookmark:[]} as User
  @Input() list:Repository[] = [];

  public constructor(private dataService:DataService, private authService: AuthService ){
  }

  async ngOnInit(): Promise<void> {
    if (!this.user.token) {
      try {
        this.authService.CurrentUser$.subscribe((loginUser:User)=>{
          this.user = loginUser;
        });
        this.authService.login(this.user)
        console.log("home",this.user);
        
       }catch(err:any){
        console.log(err.message)
       }
    }
  }

}

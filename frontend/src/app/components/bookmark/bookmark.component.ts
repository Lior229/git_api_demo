import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import User from 'src/app/models/User';
import Repository from 'src/app/models/Repository';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.scss']
})
export class BookmarkComponent implements OnInit{
  private user:User = {token:'',bookmark:[]};
  @Output() bookmarks:Repository[] = [];

  public constructor(private authService: AuthService ){
  }

  async ngOnInit(): Promise<void> {
    this.authService.CurrentUser$.subscribe((loginUser:User)=>{
      this.user = loginUser;})
    this.authService.login(this.user)
    this.bookmarks = this.user.bookmark
    console.log(this.bookmarks);
  }

}

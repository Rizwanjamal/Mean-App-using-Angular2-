import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logo = "/assets/logo-live.png";
  
  @Input()
  userName : string = null ;

  constructor(private router: Router, private userService: UserService) {
    userService.getLoggedInUserName.subscribe(name => this.changeName(name));
   }

    private changeName(name: string): void {
        this.userName = name;
    }

  ngOnInit() {
    // this.getUser();
  }

  // getUser(){
  //   this.userService.getCurrentUser().then((username) => {  
  //     this.username = username;
  //     console.log(this.username);
  //   }, (err) => {
  //     console.log(err);
  //   });
  // }

  logout(){
    this.userService.logout().then((res) => {
      console.log(res);
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
    })
  }

}

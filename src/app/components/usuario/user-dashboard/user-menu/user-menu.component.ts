import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.css']
})
export class UserMenuComponent implements OnInit {

  public admin: boolean = false
  constructor(
    public auth: AuthService,
  ) { }

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('omlog'))
    if (user.m) {
      this.admin = true
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  adminUrl = environment.adminUrl
  constructor() { }

  ngOnInit(): void {
  }


  test() {

    let obj = {
      'userid': 1,
      'roleName': "admin",
      'userName': "admin",
      'token': "ajsdasbdas das dsajdbuasdbu1"
    }

    window.location.href = `${environment.adminUrl}/#/admin-dashboard?userid=${obj.userid}`;

  }
}

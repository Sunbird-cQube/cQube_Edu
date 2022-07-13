import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/IMenuItem';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() menu: IMenuItem[] | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  setMenuLinkActive(menuItemSelected: IMenuItem): void {
    this.menu?.forEach(menuItem => {
      menuItem.isSelected = false;
    });
    menuItemSelected.isSelected = true;
  }
  toggleSideBar(): void {
    if(document.body.classList.contains("sidebaractive")) {
      document.body.classList.remove("sidebaractive");
    } else {
      document.body.classList.add("sidebaractive");
    }     
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from '../../models/IMenuItem';
import { MatTooltipModule } from '@angular/material/tooltip';
import { faL } from '@fortawesome/free-solid-svg-icons';

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
      if(menuItem.isSelected == true)  {
        menuItem.isSelected = false;
      }
    });
    menuItemSelected.isSelected = true;
    this.toggleSideBar();
    
  }
  
  toggleSideBar(): void {
    const ckbox=document.getElementById('openSidebarMenu') as HTMLInputElement;
    if(document.body.classList.contains("sidebaractive")) {
      document.body.classList.remove("sidebaractive");
      ckbox.checked=false;
    } else {
    ckbox.checked = true;
    document.body.classList.add("sidebaractive");
    }     
  }

}

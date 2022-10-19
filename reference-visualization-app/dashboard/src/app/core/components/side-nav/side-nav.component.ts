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
  ckBoxProp=false;
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
    // document.body.classList.add("sidebaractive");
    this.toggleSideBar();
    
  }
  
  toggleSideBar(menuIconlicked?:string): void {
    let ckbox=document.getElementById('openSidebarMenu') as HTMLInputElement;
    console.log(ckbox.checked);
    console.log("side bar active:",document.body.classList.contains("sidebaractive"))
    if(document.body.classList.contains("sidebaractive") && !menuIconlicked) {
    
      return;

    }
    else
    {
      if(document.body.classList.contains("sidebaractive")) {
        document.body.classList.remove("sidebaractive");
        ckbox.checked=false;   
        this.ckBoxProp = ckbox.checked   
      } 
  
      else {
      ckbox.checked = true;
      this.ckBoxProp =  ckbox.checked
      document.body.classList.add("sidebaractive");
      }   


    } 
      
  }

}

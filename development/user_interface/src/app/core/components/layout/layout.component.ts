import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from 'src/app/core/services/config/config.service';
import { environment } from 'src/environments/environment';
import { IDashboardMenu } from '../../models/IDashboardCard';
import { IMenuItem } from '../../models/IMenuItem';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menu: IMenuItem[] | undefined;
  national: boolean = true;
  // Font Increase Decrease Variables
  fontSize: any;
  defaultFontSize = 16;
  @ViewChild('increaseFontSize')
  increaseFontSize!: ElementRef;
  @ViewChild('decreaseFontSize')
  decreaseFontSize!: ElementRef;
  @ViewChild('resetFontSize')
  resetFontSize!: ElementRef;
  // @ViewChild('darkModeToggle') darkModeToggle: ElementRef;
  constructor(private readonly _configService: ConfigService, private renderer: Renderer2, private router: Router) {
    // this._configService.getDashboardMetrics(true).subscribe(menuResult => {
    //   this.menu = [];
    //   let menuToDisplay: IMenuItem | any = {};
    //   menuToDisplay.label = "Dashboard";
    //   menuToDisplay.path = "/dashboard";
    //   menuToDisplay.icon = 'dashboard.png';
    //   menuToDisplay.isSelected = true;
    //   menuToDisplay.basepath = "dasboard";
    //   this.menu.push(menuToDisplay);

    //   menuResult?.result?.forEach((dasboardMenu: IDashboardMenu) => {
    //     let menuToDisplay: IMenuItem | any = {};
    //     menuToDisplay.label = dasboardMenu.title;
    //     menuToDisplay.path = dasboardMenu.navigationURL;
    //     menuToDisplay.icon = dasboardMenu.icon;
    //     menuToDisplay.isSelected = false;
    //     this.menu?.push(menuToDisplay);
    //   });
    //   //this.menu = menuResult.result;
    // });

    this._configService.getMainMenuItem().subscribe(menuResult => {
      this.menu = [];
      let menuToDisplay: IMenuItem | any = {};
      menuToDisplay.label = "Dashboard";
      menuToDisplay.path = "/dashboard";
      menuToDisplay.icon = 'dashboard.png';
      menuToDisplay.isSelected = true;
      menuToDisplay.basepath = "dasboard";
      this.menu.push(menuToDisplay);

      menuResult?.result?.forEach((dasboardMenu: IDashboardMenu) => {
        let menuToDisplay: IMenuItem | any = {};
        menuToDisplay.label = dasboardMenu.title;
        menuToDisplay.path = dasboardMenu.navigationURL;
        menuToDisplay.icon = dasboardMenu.icon;
        menuToDisplay.isSelected = false;
        this.menu?.push(menuToDisplay);
      });
    })
  }

  ngOnInit(): void {
    if (environment.config === 'state') {
      this.national = false;
    }
  }


  // Change Font Size (Increase & Decrease)
  getLocalFontSize() {
    const localFontSize = localStorage.getItem('fontSize');
    if (localFontSize) {
      document.documentElement.style.setProperty('font-size', localFontSize + 'px');
      this.fontSize = localFontSize;
      this.isDisableFontSize(localFontSize);
    }
  }
  changeFontSize(value: string) {

    const elFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');

    const localFontSize = localStorage.getItem('fontSize');
    const currentFontSize = localFontSize ? localFontSize : elFontSize;
    this.fontSize = parseInt(currentFontSize);

    if (value === 'increase') {
      this.renderer.setAttribute(this.increaseFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'aria-pressed');
      this.fontSize = this.fontSize + 2;
      if (this.fontSize <= 24) {
        this.setLocalFontSize(this.fontSize);
      }
    } else if (value === 'decrease') {
      this.renderer.setAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'aria-pressed');
      this.fontSize = this.fontSize - 2;
      if (this.fontSize >= 12) {
        this.setLocalFontSize(this.fontSize);
      }
    } else {
      this.renderer.setAttribute(this.resetFontSize.nativeElement, 'aria-pressed', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'aria-pressed');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'aria-pressed');
      this.setLocalFontSize(this.defaultFontSize);
    }

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500)
  }

  setLocalFontSize(value: any) {
    document.documentElement.style.setProperty('font-size', value + 'px');
    localStorage.setItem('fontSize', value);
    this.isDisableFontSize(value);
  }

  isDisableFontSize(value: any) {
    value = parseInt(value);
    if (value === 24) {
      this.renderer.setAttribute(this.increaseFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    } else if (value === 12) {
      this.renderer.setAttribute(this.decreaseFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    } else if (value === 16) {
      this.renderer.setAttribute(this.resetFontSize.nativeElement, 'disabled', 'true');
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
    } else {
      this.renderer.removeAttribute(this.increaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.decreaseFontSize.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.resetFontSize.nativeElement, 'disabled');
    }
  }
  signOut() {
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}

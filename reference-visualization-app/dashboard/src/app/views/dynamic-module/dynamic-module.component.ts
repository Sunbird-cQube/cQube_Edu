import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { throwIfEmpty } from 'rxjs';
import { dynamicReportService } from 'src/app/core/services/core-apis/dynamic-report.service';
@Component({
  selector: 'app-dynamic-module',
  templateUrl: './dynamic-module.component.html',
  styleUrls: ['./dynamic-module.component.scss']
})
export class DynamicModuleComponent implements OnInit {

  tabIndex = 0;
  loadTabs: boolean = false;

  title

  tabNames
  public datasourse
  currentRoute: string[];
  constructor(public cardService: dynamicReportService, private route: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((params:any) => {
      this.getTabNames();
    })
  }

  url

  ngOnInit(): void {

    

  }

  getTabNames() {
    this.cardService.configurableCardProperty().subscribe(res => {
      this.url = this.route.url.split('/')
      this.tabNames = res['data']
      this.datasourse = this.url[1].replace(/-/g, '_').toLowerCase()
      this.title = this.url[1].replace(/-/g, ' ')
      this.tabNames = this.tabNames.filter(tab => tab.report_name.toLowerCase().replace(/_/g, '-') == this.url[1].toLowerCase())
      this.loadTabs = true;
    })

  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    this.loadTabs = false;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      this.loadTabs = true;
    }, 100);
  }

}

import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { dynamicReportService } from 'src/app/core/services/core-apis/dynamic-report.service';

@Component({
  selector: 'app-text-book',
  templateUrl: './text-book.component.html',
  styleUrls: ['./text-book.component.scss']
})
export class TextBookComponent implements OnInit {

  tabIndex = 0;

  tabNames
  public datasourse
  currentRoute: string[];
  constructor(public cardService: dynamicReportService, private route: Router) {

  }

  url

  ngOnInit(): void {


    this.getTabNames()

  }

  getTabNames() {
    this.cardService.configurableCardProperty().subscribe(res => {
      this.url = this.route.url.split('/')
      this.tabNames = res['data']
      this.datasourse = this.url[1].replace(/-/g, '_').toLowerCase()
      this.tabNames = this.tabNames.filter(tab => tab.report_name.toLowerCase().replace(/_/g, '-') == this.url[1].toLowerCase())
    })
   

  }

  onTabChanged($event: any): void {
    this.tabIndex = $event.index;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      
    }, 100);
  }
}

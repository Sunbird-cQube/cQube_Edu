import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cQube National';
  constructor(private translate: TranslateService, private titleService: Title) {
    translate.setDefaultLang('en');
    translate.use('en');
    // if(environment.config === 'state'){
    //   this.titleService.setTitle('State VSK')
    // }
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-material-button-group',
  templateUrl: './material-button-group.component.html',
  styleUrls: ['./material-button-group.component.scss']
})
export class MaterialButtonGroupComponent implements OnInit {

  config: string = environment.config
  national: boolean = true;  
  @Input() buttons: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    if(this.config == 'state'){
      this.national = false;
    }
  }

  onSelect(buttons: any, index: number): any {
    this.select.emit({
      items: buttons,
      index
    });
  }

}

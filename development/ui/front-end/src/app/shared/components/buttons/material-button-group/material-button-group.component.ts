import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-material-button-group',
  templateUrl: './material-button-group.component.html',
  styleUrls: ['./material-button-group.component.scss']
})
export class MaterialButtonGroupComponent implements OnInit {

  @Input() buttons: any;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(buttons: any, index: number): any {
    this.select.emit({
      items: buttons,
      index
    });
  }

}

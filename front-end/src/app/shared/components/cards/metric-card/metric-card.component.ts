import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metric-card',
  templateUrl: './metric-card.component.html',
  styleUrls: ['./metric-card.component.scss']
})
export class MetricCardComponent implements OnInit {

  @Input() name: string | undefined;
  @Input() value: string | undefined;
  @Input() tooltip: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}

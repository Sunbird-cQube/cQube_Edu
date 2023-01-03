import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-big-number',
  templateUrl: './big-number.component.html',
  styleUrls: ['./big-number.component.scss']
})
export class BigNumberComponent implements OnInit, OnChanges {

  @Input() bigNumberReportData: any;
  averagePercentage: any;
  differenceInPercentage: any;
  differenceIndicator: boolean = undefined;
  valueSuffix: any;
  constructor() { }

  ngOnInit(): void {
    
  }

  ngOnChanges(): void {
    this.updateValues();
  }

  updateValues(): void {
    this.averagePercentage = this.bigNumberReportData?.averagePercentage;
    this.valueSuffix = this.bigNumberReportData.valueSuffix ? this.bigNumberReportData.valueSuffix : '';
    if(this.bigNumberReportData && this.bigNumberReportData.differencePercentage && this.bigNumberReportData.averagePercentage) {
      this.differenceInPercentage = (this.bigNumberReportData.averagePercentage - this.bigNumberReportData.differencePercentage).toFixed(2);
      console.log(this.differenceInPercentage)
    }
    if(this.differenceInPercentage > 0){
      this.differenceIndicator = true;
    }
    else if(this.differenceInPercentage < 0) {
      this.differenceIndicator = false;
      this.differenceInPercentage = Math.abs(this.differenceInPercentage)
    }
    else {
      this.differenceIndicator = undefined;
    }
  }

}

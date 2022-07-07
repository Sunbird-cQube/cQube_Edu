import { Component, OnInit } from '@angular/core';
import { ETBService } from 'src/app/core/services/etb/etb.service';
import * as Highcharts from "highcharts/highstock";

@Component({
  selector: 'app-etb-coverage',
  templateUrl: './etb-coverage.component.html',
  styleUrls: ['./etb-coverage.component.scss']
})
export class EtbCoverageComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;

  constructor(private readonly _ETBService: ETBService) {
    this.getStateWiseETBCoverageData();
  }

  ngOnInit(): void {
  }

  getStateWiseETBCoverageData(){
    return this._ETBService.getStateWiseETBCoverageData().subscribe(res => {
      this.tableData = res.result.data;
      this.columns = res.result.columns;


      this.options = {
        title: {
          text: ""
        },
        yAxis: {
          title: {
            y: 60,
            text: 'Overall ETB Coverage'
          }
        },
        series: [{
          type: 'solidgauge',
          name: 'Speed',
          data: [60.6],
          innerRadius: '80%',
          dataLabels: {
              y: -20,
              format:
                  '<div style="text-align:center">' +
                  '<span style="font-size:25px">{y}%</span><br/>' +
                  '</div>'
          },
          tooltip: {
              valueSuffix: ' %'
          }
        }]
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import { NasService } from 'src/app/core/services/nas/nas.service';
@Component({
  selector: 'app-nas-program',
  templateUrl: './nas-program.component.html',
  styleUrls: ['./nas-program.component.scss']
})
export class NasProgramComponent implements OnInit {
  tableData: any;
  columns: any[] = [];
  options: Highcharts.Options | undefined;
  constructor(private readonly _NasService: NasService) {
    this.getStateWiseNasCoverageData()
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData() {
    return this._NasService.getNasStateData().subscribe((res:any) => {
      
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

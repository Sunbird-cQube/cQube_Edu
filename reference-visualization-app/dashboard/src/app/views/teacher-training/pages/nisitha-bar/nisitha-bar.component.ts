import { Component, OnInit } from '@angular/core';
import { NasService } from 'src/app/core/services/nas/nas.service';
import * as Highcharts from "highcharts/highstock";
@Component({
  selector: 'app-nisitha-bar',
  templateUrl: './nisitha-bar.component.html',
  styleUrls: ['./nisitha-bar.component.scss']
})
export class NisithaBarComponent implements OnInit {
  tableData: any;
  options: Highcharts.Options | undefined;
  fileName: string = "Report_data";
  constructor(private readonly _NasService: NasService) { 
    this.getStateWiseNasCoverageData()
  }

  ngOnInit(): void {
  }

  getStateWiseNasCoverageData() {
    return this._NasService.getNasStateData().subscribe((res: any) => {
      this.tableData = res.result;

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

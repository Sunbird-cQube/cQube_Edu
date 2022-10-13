import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AppServiceComponent } from 'src/app/app.service';

import { environment } from 'src/environments/environment';
import { ContentUsagePieService } from 'src/app/core/services/content-usage-pie.service';
import { MultiSelectComponent } from 'src/app/shared/components/core-components/multi-select/multi-select.component';
import { getChartJSConfig } from 'src/app/core/config/ChartjsConfig';
import { formatNumberForReport } from 'src/app/utilities/NumberFomatter';

@Component({
  selector: 'app-content-usage-pie-chart',
  templateUrl: './content-usage-pie-chart.component.html',
  styleUrls: ['./content-usage-pie-chart.component.css']
})
export class ContentUsagePieChartComponent implements OnInit {
  chartOptions;

  public pieData
  public stateData = [];
  public distData: any
  public level
  public state
  public districtSelectBox = false;
  public reportData: any = [];
  public fileName;
  public type

  public waterMark = environment.water_mark;
  config;
  dashletData;
  distDashlets;

  constructor(
    public service: ContentUsagePieService,
    public commonService: AppServiceComponent,
    private changeDetection: ChangeDetectorRef,
  ) { }

  width = window.innerWidth;
  height = window.innerHeight;
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  public stateDropDown = [{ key: 'State Level Data', name: 'State Level Data' }, { key: 'State with Districts', name: 'State with Districts' }]
  selectedDrop = 'State Level Data'

  @ViewChild(MultiSelectComponent) multiSelect1: MultiSelectComponent;

  public userAccessLevel = localStorage.getItem("userLevel");
  public hideIfAccessLevel: boolean = false
  public hideAccessBtn: boolean = false
showError = false
  ngOnInit(): void {
    this.commonService.errMsg();
    this.changeDetection.detectChanges();
    this.state = this.commonService.state;
    document.getElementById("accessProgressCard") ? document.getElementById("accessProgressCard").style.display = "none" : "";
    document.getElementById('spinner') ? document.getElementById('spinner').style.display = "none" : "";
    document.getElementById("backBtn") ? document.getElementById("backBtn").style.display = "none" : "";
    if (environment.auth_api === 'cqube' || this.userAccessLevel === "") {
      this.getStateData();
    }else{
      if ( this.userAccessLevel === "District"){
        this.onStateDropSelected("State with Districts")
        this.getview()
      }else{
        document.getElementById('spinner').style.display = "none"
        this.showError = true
      }
    }
    
    this.hideAccessBtn = (environment.auth_api === 'cqube' || this.userAccessLevel === "" || undefined) ? true : false;
    
  }

  getview(){
    let distId = localStorage.getItem('userLocation')
    this.districtSelectBox = false;
    try {
      this.service.dikshaPieDist().subscribe(res => {
        let distData = res['data'].data;
        const filteredKeys = [distId];

        this.distData = filteredKeys
          .reduce((obj, key) => ({ ...obj, [key]: distData[key] }), {});
        
        
        this.createDistPiechart()
      })

    } catch (error) {
      this.distData = [];
      this.commonService.loaderAndErr(this.distData);
    }
  }

  public skul = true;
  public stateContentUsage

  getStateData() {
    this.commonService.errMsg();
    this.stateData = [];
    this.type = "state"
    try {
      document.getElementById('spinner') ? document.getElementById('spinner').style.display = "block" : "";
      this.service.dikshaPieState().subscribe(res => {
        this.pieData = res['data'].data;
        this.stateContentUsage = res['data'].footer.total_content_plays.toLocaleString('en-IN');

        this.fileName = 'Content-usage-state';
        this.reportData = res['data'].data;
        this.stateData = this.restructurePieChartData(this.pieData)

        this.createPieChart(this.pieData);
        this.getDistMeta();

        setTimeout(() => {
          document.getElementById('spinner') ? document.getElementById('spinner').style.display = "none" : "";
        }, 300);
      },
        (err) => {
          this.stateData = [];
          this.commonService.loaderAndErr(this.stateData);
        });
    } catch (e) {
      this.stateData = [];
      this.commonService.loaderAndErr(this.stateData);
      console.log(e);
    }
  }

  clickHome() {
    this.selectedDist = "";
    this.selectedDrop = 'State Level Data'
    this.distToggle = false;
    this.districtSelectBox = false;
    this.selectedDistricts = [];
    this.dist = false;
    this.skul = true;
    if (environment.auth_api === 'cqube' || this.userAccessLevel === "") {
      this.getStateData();
      this.multiSelect1.resetSelected();
    }else{
      this.onStateDropSelected("State with Districts")
      this.getview()
    }
    

  }


  restructurePieChartData(pieData) {
    let data: any = []
    pieData.forEach(item => {
      data.push({
        name: item.object_type,
        color: `#${item.color_code}`,
        y: item.total_content_plays_percent,
        value: item.total_content_plays
      })
    })
    return data

  }

  disWisePieChart: any = []

  /// distData
  getDistData() {
    try {
      this.service.dikshaPieDist().subscribe(res => {
        this.distData = res['data'].data;
        this.createDistPiechart()
      })

    } catch (error) {
      this.distData = [];
      this.commonService.loaderAndErr(this.distData);
    }
  }

  public distMetaData;
  public distToDropDown
  selectedDistricts: any = [];

  /// distMeta
  getDistMeta() {
    try {
      this.service.diskshaPieMeta().subscribe(res => {
        this.distMetaData = res['data'];
        this.selectedDistricts = [];
        this.distToDropDown = this.distMetaData.Districts.map((dist: any) => {
          this.selectedDistricts.push(dist.district_id);
          dist.id = dist.district_id
          dist.name = dist.district_name;
          dist.status = false;
          return dist
        })
        this.distToDropDown.sort((a, b) => a.district_name.localeCompare(b.district_name))
        if (environment.auth_api === 'cqube' || this.userAccessLevel === "") {
          this.getDistData();
        }
        

      })
    } catch (error) {
      this.distMetaData = [];
      this.commonService.loaderAndErr(this.distMetaData);

    }

  }

  public distToggle = false

  onStateDropSelected(data) {
    this.selectedDrop = data;
    document.getElementById('spinner').style.display = "block"

    setTimeout(() => {
      document.getElementById('spinner').style.display = "none"
    }, 2000);
    try {

      if (this.selectedDrop === 'State with Districts') {
        this.distToggle = true
        this.districtSelectBox = true;
      } else {
        this.distToggle = false;
        this.districtSelectBox = false;
      }
      if (environment.auth_api === 'cqube' || this.userAccessLevel === "") {
        this.getStateData();
        this.getDistData();

      }else{
        this.getStateData();
      }
      

    } catch (error) {
      this.distData = [];
      this.commonService.loaderAndErr(this.distData);

    }


  }

  public selectedDist;
  public distWiseData = [];
  public distPieData = [];
  public dist = false;
  public distName

  onSelectDistrict(data) {
    try {
      if (data.length > 0) {
        this.selectedDistricts = data.slice()
      } else {
        this.distMetaData.Districts.forEach((dist: any) => {
          this.selectedDistricts.push(dist.district_id);
        })
      }

      this.createDistPiechart()
    } catch (error) {

    }

  }

  clearSuccessors(type: string): any {
    if (type == "District") {
      this.selectedDistricts = []
    }
  }

  //filter downloadable data
  dataToDownload = [];
  newDownload(element) {
    var data1 = {}, data2 = {}, data3 = {};
    Object.keys(element).forEach(key => {
      if (key !== "color_code") {

        data1[key] = element[key];
      }

    });

    this.dataToDownload.push(data1);
  }

  //download UI data::::::::::::
  reportName = "pieChart"
  downloadReport() {
    this.dataToDownload = [];
    this.reportData.forEach(element => {
      this.selectedDistricts.forEach(district => {
        let distData = this.distData[district];
        let distName = distData[0].district_name;
        let objectValue = distData.find(metric => metric.object_type === element.object_type);

        element[distName] = objectValue && objectValue.total_content_plays_percent ? objectValue.total_content_plays_percent : 0;
      });

      this.newDownload(element);
    });
    this.commonService.download(this.fileName, this.dataToDownload, this.reportName);
  }




  distPieChart
  disttoLoop = []
  allDistData
  distWisePieData
  chartData

  newPieData

  createDistPiechart() {
    let pieData: any = [];
    Object.keys(this.distData).forEach(keys => {
      pieData.push({
        id: keys,
        data: this.distData[keys]
      })
    });

    let Distdata: any = [];
    let distDashlets = [];
    if (environment.auth_api === 'cqube' || this.userAccessLevel === "") {
      pieData.filter(district => {
        return this.selectedDistricts.find(districtId => districtId === +district.id)
      }).forEach((district, i) => {
        let obj = {
          name: district.data[0].district_name,
          totalContentDistWise: district.data[0].total_content_plays_districtwise.toLocaleString('en-IN'),
          percentOverState: district.data[0].percentage_over_state,
          data: []
        }

        district.data.forEach((metric, i) => {
          obj.data.push({ name: metric.object_type, color: `#${metric.color_code}`, y: metric.total_content_plays_percent, value: metric.total_content_plays_districtwise });
        });


        Distdata.push(obj);
        Distdata.sort((a, b) => a.name.localeCompare(b.name));

        distDashlets.push({
          name: obj.name,
          config: getChartJSConfig({
            labelExpr: 'object_type',
            datasets: [
              { dataExpr: 'total_content_plays_percent', label: 'total_content_plays_percent' }
            ],
            options: {
              title: {
                text: `${obj.name}-Total Content Usage: ${obj.totalContentDistWise} (${obj.percentOverState}%)`,
                display: true
              },
              legend: {
                display: false
              },
              height: '200',
              scales: {
                xAxes: [{
                  ticks: {
                    display: false //this will remove only the label
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    tickMarkLength: false,
                    zeroLineColor:'transparent'
                  }
                }],
                yAxes: [{
                  ticks: {
                    display: false //this will remove only the label
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    tickMarkLength: false,
                    zeroLineColor:'transparent'
                  }
                }]
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem) => {
                    let multistringText = [];
                    console.log(district.data);
                    
                    multistringText.push(`District: ${obj.name}`);
                    multistringText.push(`Name: ${district.data[tooltipItem.index]['object_type']}`);
                    multistringText.push(`Percentage: ${district.data[tooltipItem.index]['total_content_plays_percent']}%`);
                    multistringText.push(`Total Content Play: ${formatNumberForReport(district.data[tooltipItem.index]['total_content_plays_districtwise'])}`);
      
                    return multistringText;
                  }
                }
              }
            }
          }),
          data: {
            values: district.data
          }
        });        
      })
    }else{
      pieData.forEach((district, i) => {
        let obj = {
          name: district.data[0].district_name,
          totalContentDistWise: district.data[0].total_content_plays_districtwise.toLocaleString('en-IN'),
          percentOverState: district.data[0].percentage_over_state,
          data: []
        }

        district.data.forEach((metric, i) => {
          obj.data.push({ name: metric.object_type, color: `#${metric.color_code}`, y: metric.total_content_plays_percent, value: metric.total_content_plays_districtwise });
        });


        Distdata.push(obj);
        Distdata.sort((a, b) => a.name.localeCompare(b.name));

        distDashlets.push({
          name: obj.name,
          config: getChartJSConfig({
            labelExpr: 'object_type',
            datasets: [
              { dataExpr: 'total_content_plays_percent', label: 'total_content_plays_percent' }
            ],
            options: {
              title: {
                text: `${obj.name}-Total Content Usage: ${obj.totalContentDistWise} (${obj.percentOverState}%)`,
                display: true
              },
              legend: {
                display: false
              },
              height: '200',
              scales: {
                xAxes: [{
                  ticks: {
                    display: false //this will remove only the label
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    tickMarkLength: false,
                    zeroLineColor:'transparent'
                  }
                }],
                yAxes: [{
                  ticks: {
                    display: false //this will remove only the label
                  },
                  gridLines: {
                    display: false,
                    drawBorder: false,
                    tickMarkLength: false,
                    zeroLineColor:'transparent'
                  }
                }]
              },
              tooltips: {
                callbacks: {
                  label: (tooltipItem) => {
                    let multistringText = [];
                    
                    //multistringText.push(`District: ${data[tooltipItem.index]['district_name']}`);
                    multistringText.push(`Name: ${district.data[tooltipItem.index]['object_type']}`);
                    multistringText.push(`Percentage: ${district.data[tooltipItem.index]['total_content_plays_percent']}%`);
                    multistringText.push(`Total Content Play: ${formatNumberForReport(district.data[tooltipItem.index]['total_content_plays_districtwise'])}`);
      
                    return multistringText;
                  }
                }
              }
            }
          }),
          data: {
            values: district.data
          }
        })
      })
    }

    distDashlets.sort((a, b) => a.name.localeCompare(b.name));
    this.distDashlets = distDashlets;
  }



  createPieChart(data) {
    this.config = getChartJSConfig({
      labelExpr: 'object_type',
      datasets: [
        { dataExpr: 'total_content_plays_percent', label: 'total_content_plays_percent' }
      ],
      options: {
        height: this.height > 1760
              ? this.height * 0.5
              : this.height > 1160 && this.height < 1760
              ? this.height * 0.4
              : this.height > 667 && this.height < 1160
              ? this.height * 0.3
              : this.height * 0.25,
        legend: {
          position: "left",
          align: "start",
          labels: {
            usePointStyle: true,
            boxWidth: 10
          }
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false //this will remove only the label
            },
            gridLines: {
              display: false,
              drawBorder: false,
              tickMarkLength: false,
              zeroLineColor:'transparent'
            }
          }],
          yAxes: [{
            ticks: {
              display: false //this will remove only the label
            },
            gridLines: {
              display: false,
              drawBorder: false,
              tickMarkLength: false,
              zeroLineColor:'transparent'
            }
          }]
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem) => {
              let multistringText = [];
              
              //multistringText.push(`District: ${data[tooltipItem.index]['district_name']}`);
              multistringText.push(`Name: ${data[tooltipItem.index]['object_type']}`);
              multistringText.push(`Percentage: ${data[tooltipItem.index]['total_content_plays_percent']}%`);
              multistringText.push(`Total Content Play: ${formatNumberForReport(data[tooltipItem.index]['total_content_plays'])}`);

              return multistringText;
            }
          }
        }
      }
    });
    
    this.dashletData = {
      values: data
    };
  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceComponent } from 'src/app/app.service';
import { ExceptionReportService } from 'src/app/core/services/core-apis/exception-report.service';
import { environment } from 'src/environments/environment';
declare const $;

@Component({
  selector: 'app-download-exception-list',
  templateUrl: './download-exception-list.component.html',
  styleUrls: ['./download-exception-list.component.scss']
})
export class DownloadExceptionListComponent implements OnInit {

  fileName: any;
  reportData: any = [];
  managementName;
  management = 'overall';
  category = 'overall';

  public waterMark = environment.water_mark

  constructor(private router: Router, private service: ExceptionReportService, public commonService: AppServiceComponent) { }

  ngOnInit(): void {
    // document.getElementById('accessProgressCard').style.display = 'none';
    // document.getElementById('backBtn') ? document.getElementById('backBtn').style.display = 'none' : "";
    // this.managementName = this.management = JSON.parse(localStorage.getItem('management')).id;
    // this.category = JSON.parse(localStorage.getItem('category')).id;
    // this.managementName = this.commonService.changeingStringCases(
    //   this.managementName.replace(/_/g, " ")
    // );
    $(document).ready(function () {
      $('#table').DataTable({
        destroy: true, bLengthChange: false, bInfo: false,
        bPaginate: false, scrollY: "58vh", scrollX: true,
        scrollCollapse: true, paging: false, searching: false
      });
    });
  }

  school_Invalid_Data() {
    document.getElementById('spinner').style.display = 'block';
    this.service.school_invalid({ management: this.management, category: this.category }).subscribe(res => {
      document.getElementById("spinner").style.display = "none";
      window.open(`${res["downloadUrl"]}`, "_blank");
    }, err => {
      alert('No data found, Unable to download');
      document.getElementById('errMsg').style.color = 'red';
      document.getElementById('errMsg').style.display = 'block';
      document.getElementById('errMsg').innerHTML = 'No data found';
      document.getElementById('spinner').style.display = 'none';
    })
  }

  // to download the excel report
  downloadReport() {
    this.commonService.download(this.fileName, this.reportData);
  }

}

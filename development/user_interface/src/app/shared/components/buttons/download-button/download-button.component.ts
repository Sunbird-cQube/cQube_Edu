import { Component, Input, OnInit } from '@angular/core';

import * as json2csv from 'json2csv';
// import { Parser } from 'json2csv'
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.scss']
})
export class DownloadButtonComponent implements OnInit {

  @Input() data: any;
  @Input() fileName: any;

  constructor() { }

  ngOnInit(): void {

  }



  // Download reports....
  download(reportData: any, fileName: any,) {
  
    let keys: [] | any
    if (reportData.length <= 0) {
      alert("No data found to download");
    }
    else {

      keys = Object.keys(reportData[0]).filter(key => key !== 'tooltip');

    };
    const opts = { fields: keys, output: fileName };
    const csv = json2csv.parse(reportData, opts);

    let file = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    saveAs(file, `${fileName}.csv`);
  }
}




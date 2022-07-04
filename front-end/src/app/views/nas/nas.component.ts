import { Component, OnInit } from '@angular/core';
import { NasService } from 'src/app/core/services/nas/nas.service';

@Component({
  selector: 'app-nas',
  templateUrl: './nas.component.html',
  styleUrls: ['./nas.component.scss']
})
export class NasComponent implements OnInit {
   NASMetrics: any[] | undefined;
  NASProgramStatsByLocation:any

  constructor(private readonly _NASService: NasService) { 
    this.getNASMetrics()
  }

  ngOnInit(): void {

  }

  getNASMetrics(): void {
    this._NASService.getNASMetrics().subscribe(NASMetricsRes => {
      this.NASMetrics = NASMetricsRes.result;
      console.log('this', this.NASMetrics)
    });
  }


  onTabChanged($event: any): void {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
      console.log('resize');
    }, 100);
  }

}

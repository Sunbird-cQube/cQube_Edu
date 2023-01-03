import { Injectable } from '@angular/core';
import { CommonService } from './common/common.service';

@Injectable({
  providedIn: 'root'
})
export class WrapperService {

  constructor(private readonly _commonService: CommonService) { }

  constructFilters(filters: any, filtersConfig: any): any {
    filtersConfig.forEach((filter, index) => {
      let query = this.parseQuery(filtersConfig, filters, index);
      if (query) {
        this._commonService.getReportDataNew(query).subscribe((res: any) => {
          let { rows } = res;
          let findFilter = filters.find(fil => fil.valueProp === filter.valueProp);
          if (findFilter) {
            findFilter = {
              ...findFilter,
              options: rows.map(row => ({
                label: row[filter.labelProp],
                value: row[filter.valueProp],
              }))
            }
          } else {
            filters.push({
              ...filter,
              value: null,
              options: rows.map(row => ({
                label: row[filter.labelProp],
                value: row[filter.valueProp],
              }))
            });
          }
        });
      }
    });
  }

  formatToolTip(tooltipTemplate: string, record: any): string {
    if (this.validateBrackets(tooltipTemplate)) {
      tooltipTemplate.replace(/\n/g, '<br>');
      this.substituteValues(tooltipTemplate);
    }

    return 'Please verify the tooltip template';
  }

  validateBrackets(tooltipTemplate: string): boolean {
    const strArr = tooltipTemplate.split('');
    let counter = 0;
    for (let i = 0, len = strArr.length; i < len; i++) {
       if (strArr[i] === "{") {
          counter++;
       } else if (strArr[i] === "}") {
          counter--;
       };
       if (counter < 0) {
          return false;
       };
    };
    if (counter === 0) {
       return true;
    };
    return false;
  };

  substituteValues(tooltipTemplate: string): any {
    
  };

  parseQuery(filtersConfig, filters, index): string {
    const filter = filtersConfig[index];
    let { query } = filter;
    let startIndex = query.indexOf('{');
    let endIndex = query.indexOf('}');
    
    if (query && startIndex > -1) {
      while (startIndex > -1) {
        let propertyName = query.substring(startIndex + 1, endIndex);
        let parentFilter = filters.find(filter => filter.valueProp === propertyName);
        if (parentFilter && parentFilter.value) {
          let re = new RegExp(`{${propertyName}}`);
          query = query.replace(re, '\'' + parentFilter.value + '\'');
        } else {
          query = null;
          break;
        }

        startIndex = query.indexOf('{');
        endIndex = query.indexOf('}');
      }
    }

    return query;
  }
}

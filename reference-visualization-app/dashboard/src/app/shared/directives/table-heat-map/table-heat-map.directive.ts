import {
  AfterViewInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  QueryList,
} from '@angular/core';

import { readableColor, toHex, rgba, parseToRgba } from 'color2k';

@Directive({
  selector: '[tableHeatMapCell]',
})
export class TableHeatMapCellDirective {
  @Input('tableHeatMapCell')
  tableHeatMap = 0;

  @Input('id') colId: number | string | null = null;

  constructor(public el: ElementRef<HTMLElement>) {}
}

@Directive({
  selector: '[tableHeatMapColumn]',
})
export class TableHeatMapColumnDirective {
  @Input('id') colId: number | string | null = null;

  @Input('tableHeatMapColumn')
  options = {};
}

@Directive({
  selector: '[tableHeatMap]',
})
export class TableHeatMapDirective implements AfterViewInit {
  @ContentChildren(TableHeatMapCellDirective, { descendants: true }) tableHeatMapCells: QueryList<TableHeatMapCellDirective> | undefined;
  @ContentChildren(TableHeatMapColumnDirective, { descendants: true }) tableHeatMapColumns: QueryList<TableHeatMapColumnDirective> | undefined;

  highestValues: any = {};
  cells: TableHeatMapCellDirective[] = [];
  columns: TableHeatMapColumnDirective[] = [];
  config: any = {};

  constructor(private elRef: ElementRef) {}

  ngAfterViewInit() {
    let timer: any;

    this.tableHeatMapCells?.changes.subscribe(cells => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.colorTheTable();
      }, 1000);
    });

    this.tableHeatMapColumns?.changes.subscribe(cells => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        this.colorTheTable();
      }, 1000);
    });
  }

  colorTheTable(): void {    
    setTimeout(()=> {
      if (this.tableHeatMapCells) {
        this.cells = this.tableHeatMapCells.toArray();        
      }
  
      if (this.tableHeatMapColumns) {
        this.columns = this.tableHeatMapColumns.toArray();
      }
  
      this.setOptions();
      this.calculateHighestValues();
      this.applyHeatMap();
    }, 100);
  } 

  private setOptions() {
    this.columns.forEach((col: any) => {
      this.config = {
        ...this.config,
        [col.colId]: col.options,
      };
    });
  }

  private calculateHighestValues() {
    this.cells.forEach((cell: any) => {
      if (!Object.prototype.hasOwnProperty.call(this.highestValues, cell.colId)) {
        this.highestValues[cell.colId] = 0;
      }

      if (+cell.tableHeatMap > this.highestValues?.[cell.colId])
        this.highestValues[cell.colId] = +cell.tableHeatMap;
    });
  }

  private applyHeatMap() {
    this.cells.forEach((cell: any) => {
      const { bgColor, color } = this.getColor(cell.colId, cell.tableHeatMap);
      if (bgColor) cell.el.nativeElement.style.backgroundColor = bgColor;
      if (color) cell.el.nativeElement.style.color = color;
    });
  }

  private getColor(id: string, value: string | number) {    
    const color = this.config[id] ? this.config[id].color : '#fff';
    let [r, g, b, a] = parseToRgba(Array.isArray(color) ? color[color.length - 1] : (typeof color === 'object' && color !== null) ? color.values[color.values.length -1].color : color);
    
    if (!isNaN(Number(value))) {
      value = Number(value);
      let color = this.config[id] ? this.config[id].color : '#fff';
      let textColor = null;
      let bgColor = null;
      if (color != null) {
        /*const [h, s, l, a] = parseToHsla(color);
        const maxLightness = 1 - l;
        const percentage = value * maxLightness / this.highestValues[id];
        const lightness = +percentage.toFixed(3);
        bgColor = hsla(h, s, Math.min(1 - lightness, 0.95), a);
        if (+id == 2) {
          console.log(value, h, s, 1 - lightness, Math.min(1 - lightness, 0.95), a);
        }
        textColor = readableColor(bgColor);*/
        if (Array.isArray(color)) {
          if (value / this.highestValues[id] > 0.75) {
            color = color[0];
          } else if (value / this.highestValues[id] > 0.5) {
            color = color[1];
          } else {
            color = color[2];
          }
        }
        else if(typeof color === 'object' && color !== null) {
          let singleColor;
          if(color.type === 'percentage'){
            color.values?.every((item) => {
              if(value > item.breakPoint){
                singleColor = item.color
                return false
              }
              return true;
            });
          }
          if(singleColor === undefined){
            color = '#fff'
          }
          color = singleColor;
        }

        let [r, g, b, a] = parseToRgba(color);
        bgColor = rgba(r, g, b, +(Math.min(1, value / this.highestValues[id] + 0.06)).toFixed(3));
        textColor = readableColor(bgColor);
      }
      return {
        bgColor,
        color: textColor,
      };
    } else if (typeof value === 'string' && value.toLowerCase() === 'yes') {
      let [r, g, b, a] = parseToRgba(color);
      let bgColor = rgba(r, g, b, 100);
      let textColor = readableColor(bgColor);

      return {
        bgColor,
        color: textColor,
      };
    }

    return {
      bgColor: rgba(r, g, b, 0.04),
      color: rgba(0, 0, 0, .87)
    }
  }
}

import { state } from '@angular/animations';
import { ThisReceiver } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";
import { environment } from 'src/environments/environment';
import * as config from '../../../../../assets/data/config.json';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit, AfterViewInit, OnChanges {
  map: any;
  error = false;
  mapCenterLatlng: any;
  markers = new L.layerGroup();
  legend: any;
  countryGeoJSON: any;

  @Input() mapData!: any;
  @Input() level = 'state';
  @Input() perCapitaReport: any = false;

  @ViewChild('map') mapContainer!: ElementRef<HTMLElement>;

  constructor() {
    this.mapCenterLatlng = config.default['IN'];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(): void {
    this.markers.clearLayers();
    if (this.level === 'district') {
      // this.updateMap();
      this.initMap();
    }
    else {
      this.initMap();
    }
  }

  async initMap(): Promise<any> {
    if (!this.mapContainer || !this.mapData) {
      return;
    }
    if (this.map) {
      this.map.remove();
    }
    let reportTypeBoolean = false;
    if (typeof this.mapData?.data[0]?.indicator === 'string') {
      reportTypeBoolean = true;
    }
    this.map = L.map(this.mapContainer.nativeElement, { zoomSnap: 0.05, minZoom: 4, zoomControl: true, scrollWheelZoom: false, touchZoom: false }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.mapCenterLatlng.zoomLevel);
    try {
      await this.applyCountryBorder(this.mapData);
      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png',
        {
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }
      );

      tiles.addTo(this.map);
      this.map.attributionControl.setPrefix(false);
      // var imageUrl ='https://i.stack.imgur.com/khgzZ.png',
      // imageBounds = [[80.0, -350.0], [-40.0, 400.0]];
      // L.imageOverlay(imageUrl, imageBounds, {opacity: 0.3}).addTo(this.map);
      this.createMarkers(this.mapData);
      this.map.on('resize', () => {
        this.fitBoundsToCountryBorder();
      });
    } catch (e) {
      console.error(e);
      this.error = true;
    }
  }

  invalidateSize(): void {
    this.map.invalidateSize();
  }

  updateMap(): void {
    if (!this.map) {
      this.initMap();
      return;
    }

    this.markers.clearLayers();
    this.legend?.remove();
    this.fitBoundsToCountryBorder();
    this.createMarkers(this.mapData);
  }

  getLayerColor(e: any, legend?: boolean) {
    if (this.level === 'state' || legend) {
      let reportTypeBoolean = false;
      if (typeof e === 'string') {
        reportTypeBoolean = true;
      }
      if (reportTypeBoolean) {
        if (e.trim() == "Yes") {
          return "#1D4586";
        } else {
          return "#FFFFFF";
        }
      }
      else {
        {
          return e > 75 ? "#1D4586" :
            e > 50 ? "#1156CC" :
              e > 25 ? "#6D9FEB" :
                e >= 0 ? "#C9DAF7" : "#fff";
        }
      }
    }
    else {
      return "#fff"
    }


  }




  async applyCountryBorder(mapData: any): Promise<any> {
    let parent = this;
    return new Promise(async (resolve, reject) => {
      try {
        let body;
        if (environment.config === 'NVSK') {
          const response = await fetch(`${environment.apiURL}/assets/geo-locations/IN.json`);
          body = await response.json();
        }
        else {
          const response = await fetch(`${environment.apiURL}/assets/geo-locations/${environment.stateCode}.json`);
          body = await response.json();
        }

        const data = body;
        let min!: number, max!: number, values: any[] = [];
        let reportTypeBoolean = false;
        if (typeof mapData?.data[0]?.indicator === 'string') {
          reportTypeBoolean = true;
        }
        if (reportTypeBoolean === false) {
          mapData.data.forEach((data: any, index: number) => {
            if (index === 0) {
              min = data.indicator;
              max = data.indicator;
              return;
            }

            min = min <= data.indicator ? min : data.indicator;
            max = max >= data.indicator ? max : data.indicator;
          });

          let range = max - min;
          // let partSize = (range / 10 % 1 === 0) ? range / 10 : Number((range / 10).toFixed(2));
          let partSize = (range / 4 % 1 === 0) ? range / 4 : Number((range / 4).toFixed(2));
          for (let i = 1; i <= 5; i++) {
            if (i === 5) {
              if(min === 0){
                values.push(this.perCapitaReport ? 0.1 : 1);
              }
              else{
                values.push(this.perCapitaReport ? min :min.toFixed(0));
              }
              continue;
            }
  
            if (i === 1) {
              values.push(this.perCapitaReport ? max :max.toFixed(0));
              continue;
            }
            if(this.perCapitaReport){
              let value = Number((max - partSize * (i - 1)).toFixed(2))
              values.push(value)
            }
            else{
              let value = Number((max - partSize * (i - 1)).toFixed(0))
              values.push(value >= 1 ? value : 1)
            }
          }
        }

        function styleStates(feature: any) {
          let color = '#fff';
          let reportTypeBoolean = false;
          if (typeof mapData?.data[0]?.indicator === 'string') {
            reportTypeBoolean = true;
          }

          mapData?.data.forEach((state: any) => {

            if (state.state_code == feature.properties.state_code) {
              color = parent.getLayerColor(state.indicator ? (max - min ? (state.indicator - min) / (max - min) * 100 : state.indicator) : -1);
            }
          });

          return {
            fillColor: color,
            weight: 1,
            opacity: 1,
            color: 'grey',
            dashArray: '0',
            fillOpacity: 1
          };
        }

        function getPopUp(feature: any) {
          let popup: any;
          mapData.data.forEach((state: any) => {

            if (state.state_code == feature.properties.state_code) {
              popup = state.tooltip
            }
          });
          return popup;
        }
        this.countryGeoJSON = L.geoJSON(data['features'], {
          onEachFeature: function (feature: any, layer: any) {
            layer.bindTooltip(getPopUp(feature));
          },
          style: styleStates,
          color: "#a0a1a3",
          weight: 1,
          fillOpacity: 0,
          fontWeight: "bold",
        }).addTo(this.map);
        this.fitBoundsToCountryBorder();
        if (this.level === 'state') {
          this.createLegend(reportTypeBoolean ? 'boolean' : 'values', this.mapData.options, values);
        }
        resolve('India map borders plotted successfully');
      } catch (e) {
        reject(e);
      }
    });
  }

  fitBoundsToCountryBorder(): void {
    this.map.fitBounds(this.countryGeoJSON.getBounds(), {
      padding: [10, 10]
    });
  }

  createMarkers(mapData: any): void {
    let reportTypeIndicator = this.mapData.options && this.mapData.options.tooltip && this.mapData.options.tooltip.reportTypeIndicator ? this.mapData.options.tooltip.reportTypeIndicator : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value'
    if (mapData && this.level !== 'state') {
      let min!: number, max!: number, values: any[] = [];
      if (reportTypeIndicator === 'value') {
        mapData.data.forEach((data: any, index: number) => {
          if (index === 0) {
            min = data.indicator;
            max = data.indicator;
            return;
          }

          min = min <= data.indicator ? min : data.indicator;
          max = max >= data.indicator ? max : data.indicator;
        });

        let range = max - min;
        // let partSize = (range / 10 % 1 === 0) ? range / 10 : Number((range / 10).toFixed(2));
        let partSize = (range / 4 % 1 === 0) ? range / 4 : Number((range / 4).toFixed(2));
        for (let i = 1; i <= 5; i++) {
          if (i === 5) {
            if(min === 0){
              values.push(1);
            }
            else{
              values.push(min.toFixed(0));
            }
            // values.push(min);
            continue;
          }

          if (i === 1) {
            values.push(max.toFixed(0));
            continue;
          }
          let value = Number((max - partSize * (i - 1)).toFixed(0))
          values.push(value >= 1 ? value : 1)
        }
      }

      mapData.data.forEach((data: any) => {
        let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
          color: "gray",
          fillColor: this.getZoneColor(reportTypeIndicator, data.indicator >= 1 ? (max - min ? (data.indicator - min) / (max - min) * 100 : data.indicator) : -1),
          fillOpacity: 1,
          strokeWeight: 0.01,
          weight: 1
        }).addTo(this.map);

        markerIcon.setRadius(5);

        const popup = R.responsivePopup({
          hasTip: false,
          autoPan: true,
          offset: [15, 20],
        }).setContent(
          data.tooltip
        );

        markerIcon.on("mouseover", (e: any) => {
          e.target.openPopup();
        });

        markerIcon.on("mouseout", (e: any) => {
          e.target.closePopup();
        });

        markerIcon.addTo(this.map).bindPopup(popup, { closeButton: false });

        this.markers.addLayer(markerIcon);
      });

      this.map.addLayer(this.markers);
      if (this.level === 'district') {
        this.createLegend(reportTypeIndicator, this.mapData.options, values);
      }
    }
  }

  createLegend(reportTypeIndicator: string, mapOptions: any, values: any): void {
    let legend = L.control({ position: 'topright' });
    let ref = this;
    let labels: any[] = [];

    legend.onAdd = function (map: any) {
      let div = L.DomUtil.create('div', 'info legend');
      if (mapOptions.legend && mapOptions.legend.title) {
        labels.push(`<strong>${mapOptions.legend.title}:</strong>`)
      }
      if (reportTypeIndicator === 'boolean') {
        values = ["Yes", "No"];

        for (let i = 0; i < values.length; i++) {
          labels.push(`<i class="fa fa-square" style="color:${ref.getLayerColor(values[i])}"></i> ${values[i]}`);
        }
      } else {
        values = values && values.length > 0 ? values : [100, 75, 50, 25, 0];
        for (let i = values.length; i > 1; i--) {
          labels.push(
            `<i class="fa  fa-square" style="color: ${ref.getLayerColor(25 * (i - 1), true)}"></i> 
              <span>${values[values.length - i + 1] ? values[values.length - i + 1] : 0} &dash; ${values[values.length - i]}${reportTypeIndicator === 'percent' ? '%' : ''}</span>`
          );
        }
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(this.map);
    this.legend = legend;
  }

  getZoneColor(reportTypeIndicator: string, value: string | number) {
    if (reportTypeIndicator === 'boolean') {
      if (value == "Yes") {
        return "#1D4586";
      } else {
        return "#FFFFFF";
      }
    } else {
      return value > 75 ? "#1D4586" :
        value > 50 ? "#1156CC" :
          value > 25 ? "#6D9FEB" :
            value >= 0 ? "#C9DAF7" : "#fff";
    }
  }
}

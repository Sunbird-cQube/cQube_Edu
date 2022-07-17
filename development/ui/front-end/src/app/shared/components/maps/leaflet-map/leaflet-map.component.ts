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
    this.updateMap();
  }

  async initMap(): Promise<any> {
    if (!this.mapContainer || !this.mapData) {
      return;
    }

    this.map = L.map(this.mapContainer.nativeElement, { zoomSnap: 0.05, minZoom: 4, zoomControl: true, scrollWheelZoom: false, touchZoom: false }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.mapCenterLatlng.zoomLevel);
    try {
      await this.applyCountryBorder();
      const tiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
        {
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }
      );

      tiles.addTo(this.map);
      // var imageUrl ='https://i.stack.imgur.com/khgzZ.png',
      // imageBounds = [[80.0, -350.0], [-40.0, 400.0]];
      // L.imageOverlay(imageUrl, imageBounds, {opacity: 0.3}).addTo(this.map);
      this.createMarkers(this.mapData);
      this.map.on('resize', () => {
        this.fitBoundsToCountryBorder();
      });
    } catch(e) {
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

  async applyCountryBorder(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`${environment.apiURL}/assets/geo-locations/IN.json`);
        const body = await response.json();
        const data = body;

        this.countryGeoJSON = L.geoJSON(data['features'], {
          style: {
            fillColor: '#fff',
            weight: 1,
            opacity: 1,
            color: 'grey',
            dashArray: '0',
            fillOpacity: 1
          },
          color: "#a0a1a3",
          weight: 1,
          fillOpacity: 0,
          fontWeight: "bold",
          onEachFeature: function (feature: any, layer: any) { }
        }).addTo(this.map);
        this.fitBoundsToCountryBorder();
        resolve('India map borders plotted successfully');
      } catch(e) {
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
    if (mapData) {
      let reportTypeIndicator = this.mapData.options && this.mapData.options.tooltip && this.mapData.options.tooltip.reportTypeIndicator ? this.mapData.options.tooltip.reportTypeIndicator : (typeof this.mapData.data[0].indicator === 'string') ? 'boolean' : 'value';
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
        let partSize = (range / 10 % 1 === 0) ? range / 10 : Number((range / 10).toFixed(2));
        for (let i = 1; i <= 10; i++) {
          if (i === 10) {
            values.push(min);
            continue;
          }

          if (i === 1) {
            values.push(max);
            continue;
          }

          values.push(Number((max - partSize * i).toFixed(2)));
        }
      }

      mapData.data.forEach((data: any) => {
        let markerIcon = L.circleMarker([data.Latitude, data.Longitude], {
          color: "gray",
          fillColor: this.getZoneColor(reportTypeIndicator, max ? data.indicator / max * 100 : data.indicator),
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

        markerIcon.on("mouseover",  (e:any) => {
          e.target.openPopup();
        });
        
        markerIcon.on("mouseout",  (e:any) => {
          e.target.closePopup();
        });
  
        markerIcon.addTo(this.map).bindPopup(popup, {closeButton: false});

        this.markers.addLayer(markerIcon);
      });

      this.map.addLayer(this.markers);

      this.createLegend(reportTypeIndicator, this.mapData.options, values);
      console.log('create legend')
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
          labels.push(`<i class="fa fa-square" style="color:${ref.getZoneColor(reportTypeIndicator, values[i])}"></i> ${values[i]}`);
        }
      } else {
          values = values && values.length > 0 ? values : [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
          for (let i = values.length; i > 0; i--) {
            labels.push(
              `<i class="fa  fa-square" style="color: ${ref.getZoneColor(reportTypeIndicator, 10 * i)}"></i> 
              <span>${values[values.length - i + 1] ? values[values.length - i + 1] : 0} &dash; ${values[values.length - i]}${reportTypeIndicator === 'percent' ? '%' : ''}</span>`
              );

          }
      }

      console.log(labels);
      div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(this.map);
    this.legend = legend;
  }

  getZoneColor(reportTypeIndicator: string, value: string | number) {
    if (reportTypeIndicator === 'boolean') {
        if (value == "Yes") {
            return "#36a732";
        } else {
            return "red";
        }
    } else {
      return value > 90 ? "#002966" :
              value > 80 ? "#003d99" :
                  value > 70 ? "#0052cc" :
                      value > 50 ? "#0066ff" :
                          value > 40 ? "#1a75ff" :
                              value > 30 ? "#4d94ff" :
                                  value > 20 ? "#80b3ff" :
                                      value > 10 ? "#b3d1ff" :
                                          value > 0 ? "#cce0ff" : "#e6f0ff";
    }
  }
}

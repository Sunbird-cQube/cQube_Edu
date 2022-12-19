import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';

import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";

import { MapService} from '../../../../core/services/mapservices/maps.services';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-map-my-india',
  templateUrl: './map-my-india.component.html',
  styleUrls: ['./map-my-india.component.scss']
})
export class MapMyIndiaComponent implements OnInit, AfterViewInit, OnChanges {

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  // [x: string]: any;
  // @Input() data!: string;
  // @Input() state!: any;

  // // leaflet layer dependencies
  // public map: any;
  // public layerMarkers = new L.layerGroup();
  // public markersList = new L.FeatureGroup();

  // // initial center position for the map
  // public lat: any;
  // public lng: any;

  // @ViewChild('container') container!: ElementRef<HTMLElement>;

  // constructor( public globalService: MapService, private readonly _spinner:NgxSpinnerService) { }

  // ngOnInit(): void {
  //   console.log(this.state);
  // }
  
  // ngAfterViewInit(): void {
  //   this.renderMap();
  // }

  // ngOnChanges(): void {
  //   if(this.map){
  //     this.map.remove();
  //   }
  //   if (this.container) {
  //     this.renderMap();
  //   }
  // }

  // async renderMap(): Promise<any> {
  //   this.map = L.map(this.container.nativeElement, { zoomSnap: 0.25, zoomControl: false, scrollWheelZoom: false, touchZoom: false, maxBounds: [this.globalService.mapCenterLatlng.lat, this.globalService.mapCenterLatlng.lng] }).setView([this.globalService.mapCenterLatlng.lat, this.globalService.mapCenterLatlng.lng], this.globalService.zoomLevel);
  //       L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
  //           {
  //               subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  //               maxZoom: this.globalService.zoomLevel + 10
  //           }
  //       ).addTo(this.map);
  //   await this.globalService.initMap(this.container.nativeElement, [[this.lat, this.lng]], this.data, this.state, this.map);
  //   this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
  //   this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
  //   this.getData();
  // }

  // getData() {
  //   // globalMap.removeLayer(this.markersList);
  //   this.layerMarkers.clearLayers();
  //   this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
  //   this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;

  //   this.markers = this.data
  //   // options to set for markers in the map
  //   let options = {
  //     radius: 6,
  //     fillOpacity: 1,
  //     strokeWeight: 0.01,
  //     mapZoom: this.globalService.zoomLevel,
  //     centerLat: this.lat,
  //     centerLng: this.lng,
  //     level: "State"
  //   };

  //   this.genericFun(this.markers, options);

  //   this.globalService.onResize();
  // }

  // public markers:any
  // genericFun(data:any, options:any) {
  //   try {
  //     this.markers = data;
  //     let reportTypeETB = true;

  //     if (this.markers[0].perfomance || this.markers[0].Performance) {
  //       reportTypeETB = false;
  //     }

  //     function getZoneColor(e: any) {
  //       if (reportTypeETB) {
  //           if (e == "Yes") {
  //               return "#36a732";
  //           } else {
  //               return "red";
  //           }
  //       }
  //       else {
  //           return e > 90 ? "#002966" :
  //               e > 80 ? "#003d99" :
  //                   e > 70 ? "#0052cc" :
  //                       e > 50 ? "#0066ff" :
  //                           e > 40 ? "#1a75ff" :
  //                               e > 30 ? "#4d94ff" :
  //                                   e > 20 ? "#80b3ff" :
  //                                       e > 10 ? "#b3d1ff" :
  //                                           e > 0 ? "#cce0ff" :
  //                                               "#e6f0ff";
  //       }

  //     }

  //     // attach values to markers
  //     for (var i = 0; i < this.markers.length; i++) {

  //      var color = '#36a732';

  //      if (this.markers[i].status) {
  //       let check = this.markers[i]?.status?.split(':')[1]?.trim();
  //       color = getZoneColor(check);
  //      } else {
  //       let performance = this.markers[i].perfomance ? this.markers[i].perfomance : this.markers[i].Performance;
  //       let check = typeof performance === 'string' ? Number(this.markers[i]?.perfomance?.split(':')[1]?.trim()) : performance;
  //       color = getZoneColor(check);
  //      }       

  //       var markerIcon = this.globalService.initMarkers1(
  //         this.markers[i].Latitude,
  //         this.markers[i].Longitude,
  //         color,
  //         options.strokeWeight,
  //         1,
  //         this.map
  //       );
  
  //       // data to show on the tooltip for the desired levels
  //       this.generateToolTip(
  //         this.markers[i],
  //         options.level,
  //         markerIcon,
  //         "Latitude",
  //         "Longitude",
  //         "slug",
  //         this.map
  //       );
  //     }  
  //   } catch (e) {
     
  //   }
  // }

  // popups(markerIcon:any, markers:any, ) {
  //   markerIcon.on("mouseover",  (e:any) => {
  //     console.log('mouseover');
  //      this['openPopup']();
      
  //   });
  //   markerIcon.on("mouseout",  (e:any) => {
  //     this['closePopup']();
  //   });

  //   this.layerMarkers.addLayer(markerIcon);
   
  //   markerIcon.myJsonData = markers;

  // }
  // generateToolTip(marker: any, level: any, markerIcon: any, Latitude: any, Longitude: any, slug:any, map:any) {
   
  //   var details:any = {};
  //   var orgObject:any = {};
  //   var orgObject1: any = {};
  //   var yourData1: any 
  //   var yourData2:any
  
  //   Object.keys(marker).forEach((key) => {
  //     if (key !== "Latitude" && key !== "Longitude" && key!== "Location Code") {
  //       details[key] = marker[key];
  //     }
  //   });
  //   Object.keys(details).forEach((key) => {
  //     if (key !== "Location") {
  //       orgObject1[key] = details[key];
  //     }
  //   });
  //   Object.keys(details).forEach((key) => {
  //     if (key === "Location") {
  //       orgObject[key] = details[key];
  //     }
  //   });

  //   yourData2 = this.globalService.getInfoFrom(orgObject1, "", level, "infra-map")
    
  //   yourData1 = this.globalService.getInfoFrom(orgObject, "", level, "infra-map")
   
  //     const popup = R.responsivePopup({
  //       hasTip: false,
  //       autoPan: true,
  //       offset: [15, 20],
  //     }).setContent(
        
  //       "<span style='font-weight: bold;'>" + yourData1 + "</span>" + "<br>" +
  //       yourData2

  //     );
  //     markerIcon.on("mouseover",  (e:any) => {
  //       e.target.openPopup();
  //     });
      
  //     markerIcon.on("mouseout",  (e:any) => {
  //       e.target.closePopup();
  //     });

  //     markerIcon.addTo(map).bindPopup(popup, {closeButton: false});

  // }

}




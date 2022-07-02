import { AfterViewInit, Component, Input, OnInit } from '@angular/core';

import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";

import { MapService, globalMap } from '../../../../core/services/mapservices/maps.services';

@Component({
  selector: 'app-map-my-india',
  templateUrl: './map-my-india.component.html',
  styleUrls: ['./map-my-india.component.scss']
})
export class MapMyIndiaComponent implements OnInit, AfterViewInit {
  [x: string]: any;
  @Input() data: string | undefined;
  // leaflet layer dependencies
  public layerMarkers = new L.layerGroup();
  public markersList = new L.FeatureGroup();

  // initial center position for the map
  public lat: any;
  public lng: any;
  constructor( public globalService: MapService,) { }

  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
    this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
    this.globalService.initMap("map", [[this.lat, this.lng]]);
    this.getData()
  }


  getData(){
    // globalMap.removeLayer(this.markersList);
    this.layerMarkers.clearLayers();
    this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
    this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;

    this.markers = this.data
    // options to set for markers in the map
    let options = {
      radius: 6,
      fillOpacity: 1,
      strokeWeight: 0.01,
      mapZoom: this.globalService.zoomLevel,
      centerLat: this.lat,
      centerLng: this.lng,
      level: "State"
    };

    

    this.genericFun(this.markers, options);

    this.globalService.onResize();
  }

  public markers:any
  genericFun(data:any, options:any) {
    try {
      this.markers = data;
    
      // attach values to markers
      for (var i = 0; i < this.markers.length; i++) {
       var color ="green"

        var markerIcon = this.globalService.initMarkers1(
          this.markers[i].Latitude,
          this.markers[i].Longitude,
          color,
         options.strokeWeight,
          1
        );
  
        // data to show on the tooltip for the desired levels
        this.generateToolTip(
          this.markers[i],
          options.level,
          markerIcon,
          "Latitude",
          "Longitude",
          "slug"
        );
      }  
    } catch (e) {
     
    }

  }

  popups(markerIcon:any, markers:any, ) {
    markerIcon.on("mouseover",  (e:any) => {
       this['openPopup']();
      
    });
    markerIcon.on("mouseout",  (e:any) => {
      this['closePopup']();
    });

    this.layerMarkers.addLayer(markerIcon);
   
    markerIcon.myJsonData = markers;

  }
  generateToolTip(marker: any, level: any, markerIcon: any, Latitude: any, Longitude: any, slug:any) {
   
    var details:any = {};
    var orgObject:any = {};
    var orgObject1: any = {};
    var yourData1: any 
    var yourData2:any
  
    Object.keys(marker).forEach((key) => {
      if (key !== "Latitude" ) {
        details[key] = marker[key];
      }
    });
    Object.keys(details).forEach((key) => {
      if (key === "status") {
        orgObject1[key] = details[key];
      }
    });
    Object.keys(details).forEach((key) => {
      if (key !== "Longitude" && key !== "Latitude" && key !== "status" ) {
        orgObject[key] = details[key];
      }
    });

    yourData2 = this.globalService.getInfoFrom(orgObject1, "", level, "infra-map")
    
    yourData1 = this.globalService.getInfoFrom(orgObject, "", level, "infra-map")
   
      const popup = R.responsivePopup({
        hasTip: false,
        autoPan: true,
        offset: [15, 20],
      }).setContent(
        
        "<span style='font-weight: bold;'>" + yourData1 + "</span>" + "<br>" + "<br>" +
        yourData2

      );
      markerIcon.addTo(globalMap).bindPopup(popup);

  }

}




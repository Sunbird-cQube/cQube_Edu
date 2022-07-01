import { Component, OnInit } from '@angular/core';

import * as L from "leaflet";
import * as R from "leaflet-responsive-popup";

import { MapService, globalMap } from '../../../../core/services/mapservices/maps.services';

@Component({
  selector: 'app-map-my-india',
  templateUrl: './map-my-india.component.html',
  styleUrls: ['./map-my-india.component.scss']
})
export class MapMyIndiaComponent implements OnInit {

  // leaflet layer dependencies
  public layerMarkers = new L.layerGroup();
  public markersList = new L.FeatureGroup();

  // initial center position for the map
  public lat: any;
  public lng: any;
  constructor( public globalService: MapService,) { }

  ngOnInit(): void {
    this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
    this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
    this.globalService.initMap("map", [[this.lat, this.lng]]);
    
  }

}

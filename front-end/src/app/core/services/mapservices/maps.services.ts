import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as config from '../../../../assets/data/config.json';
import * as mapData from '../../../../assets/data/IN.json';


declare var MapmyIndia: any;
declare var L: any;
export var globalMap: any;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    // mapName = environment.mapName;

   
    mapCenterLatlng = config.default['IN'];

    zoomLevel = this.mapCenterLatlng.zoomLevel;
    latitude: any;
    longitude: any;

    constructor() { }

    width = window.innerWidth;
    

    //Initialisation of Map  
    initMap(map: any, maxBounds: any) {
        console.log('manpppp', this.mapCenterLatlng )
        console.log('max-bond', maxBounds)
        console.log('max-bond', map)
        globalMap = L.map(map, { zoomSnap: 0.25, zoomControl: false, scrollWheelZoom: false, touchZoom: false, maxBounds: maxBounds }).setView([maxBounds[0][0], maxBounds[0][1]], this.mapCenterLatlng.zoomLevel);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                 maxZoom: this.mapCenterLatlng.zoomLevel + 10,
            }
        ).addTo(globalMap);


        var data = mapData.default;
        function applyCountryBorder(map: any) {
            L.geoJSON(data["IN"]['features'], {
                color: "#a0a1a3",
                weight: 1,
                fillOpacity: 0,
                fontWeight: "bold"
            }).addTo(map);
        }
        applyCountryBorder(globalMap);
        console.log('markersss')

    }

    restrictZoom(globalMap: any) {
        globalMap.touchZoom.disable();
        globalMap.boxZoom.disable();
        globalMap.keyboard.disable();
    }

    //Initialise markers.....
    markersIcons: any = [];
    public initMarkers1(lat: any, lng: any, color: any, strokeWeight: any, weight: any, levelWise: any) {
        if (lat !== undefined && lng !== undefined) {
            var markerIcon: any;
            markerIcon = L.circleMarker([lat, lng], {
                color: "gray",
                fillColor: color,
                fillOpacity: 1,
                strokeWeight: strokeWeight,
                weight: weight
            }).addTo(globalMap);
            this.markersIcons.push(markerIcon);
            return markerIcon;
        }

        return undefined;
    }
}
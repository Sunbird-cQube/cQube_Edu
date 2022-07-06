import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as config from '../../../../assets/data/config.json';
import * as mapData from '../../../../assets/data/IN.json';


declare var L: any;
export var globalMap: any;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    // mapName = environment.mapName;   
    mapCenterLatlng = config.default['IN'];
    width = window.innerWidth;
    zoomLevel = this.width > 3820 ? this.mapCenterLatlng.zoomLevel + 0.85 : this.width < 3820 && this.width >= 2500 ? this.mapCenterLatlng.zoomLevel + 0.3 : this.width < 2500 && this.width > 1920 ? this.mapCenterLatlng.zoomLevel : this.width > 1500 ? this.mapCenterLatlng.zoomLevel - 0.4 : this.width > 1336 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.width > 1200 ? this.mapCenterLatlng.zoomLevel - 0.75 : this.width > 700 ? this.mapCenterLatlng.zoomLevel - 0.3 : this.width > 76 ? this.mapCenterLatlng.zoomLevel - 0.5 : this.width > 400 ? this.mapCenterLatlng.zoomLevel - 0.6 : this.width > 320 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.mapCenterLatlng.zoomLevel;
    latitude: any;
    longitude: any;

    constructor() { }

    onResize() {
        this.width = window.innerWidth;
        this.zoomLevel = this.width > 3820 ? this.mapCenterLatlng.zoomLevel + 0.85 : this.width < 3820 && this.width >= 2500 ? this.mapCenterLatlng.zoomLevel + 0.3 : this.width < 2500 && this.width > 1920 ? this.mapCenterLatlng.zoomLevel : this.width > 1500 ? this.mapCenterLatlng.zoomLevel - 0.4 : this.width > 1336 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.width > 1200 ? this.mapCenterLatlng.zoomLevel - 0.75 : this.width > 700 ? this.mapCenterLatlng.zoomLevel - 0.3 : this.width > 76 ? this.mapCenterLatlng.zoomLevel - 0.5 : this.width > 400 ? this.mapCenterLatlng.zoomLevel - 0.6 : this.width > 320 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.mapCenterLatlng.zoomLevel;
        this.setMarkerRadius();
    }

    public map: any
    //Initialisation of Map  
    initMap(map: any, maxBounds: any, markers: any) {

        globalMap = L.map(map, { zoomSnap: 0.25, zoomControl: false, scrollWheelZoom: false, touchZoom: false, maxBounds: maxBounds }).setView([maxBounds[0][0], maxBounds[0][1]], this.zoomLevel);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
            {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                maxZoom: this.zoomLevel + 10,
            }
        ).addTo(globalMap);

        function getZoneColor(e: string) {
            if (e?.trim() == "Yes") {
                return "#a7ffa4"
            }
            else {
                return "grey"
            }
            // return e == 'Yes' ? "green" : "grey"
        }

        function style_states1(feature: any) {
            let check: string = '';
            markers.forEach((states: any) => {
                if (states?.Location?.trim() == feature?.properties?.st_nm?.trim()) {
                    // console.log(states.status)
                    check = states?.status?.split(':')[1]
                    // console.log(check)
                }
            })
            // console.log(element?.properties?.st_nm)
            // console.log(data)
            return {
                fillColor: getZoneColor(check),
                weight: 1,
                opacity: 1,
                color: 'grey',
                dashArray: '0',
                fillOpacity: 1
            };
        }

        var data = mapData.default;
        console.log(data)
        function applyCountryBorder(map: any) {
            L.geoJSON(data["IN"]['features'], {
                style: style_states1,
                color: "#a0a1a3",
                weight: 1,
                fillOpacity: 0,
                fontWeight: "bold"
            }).addTo(map);
        }
        applyCountryBorder(globalMap);
        this.map = globalMap
    }

    restrictZoom(globalMap: any) {
        globalMap.touchZoom.disable();
        globalMap.boxZoom.disable();
        globalMap.keyboard.disable();
        globalMap.doubleClickZoom.disable();
    }

    //Initialise markers.....
    markersIcons: any = [];
    public initMarkers1(lat: any, lng: any, color: any, strokeWeight: any, weight: any) {

        if (lat !== undefined && lng !== undefined) {
            var markerIcon: any;
            markerIcon = L.circleMarker([lat, lng], {
                color: "gray",
                fillColor: "green",
                fillOpacity: 1,
                strokeWeight: strokeWeight,
                weight: weight
            }).addTo(globalMap);

            this.markersIcons.push(markerIcon);

            return markerIcon;
        }

        return undefined;
    }
    getMarkerRadius(rad1: any, rad2: any, rad3: any, rad4: any) {
        let radius = this.width > 3820 ? rad1 : this.width > 2500 && this.width < 3820 ? rad2 : this.width < 2500 && this.width > 1920 ? rad3 : rad4;
        return radius;
    }

    setMarkerRadius() {
        this.markersIcons.map((markerIcon: any) => {
            markerIcon.setRadius(this.getMarkerRadius(18, 14, 10, 6));
        })
    }


    public getInfoFrom(object: any, value: any, levelWise: any, reportType: any,) {
        var popup = [];
        var stringLine;
        var selected = '<span>';
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                stringLine = selected
                    + object[key] + `</span>`;
            }
            popup.push(stringLine);
        }
        function toTitleCase(phrase: any) {
            var key = phrase
                .toLowerCase()
                .split(' ')
                .map((word: any) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            return key;
        }
        return popup;
    }
}




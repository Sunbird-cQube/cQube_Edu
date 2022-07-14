import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as config from '../../../../assets/data/config.json';
import { NgxSpinnerService } from 'ngx-spinner';

declare var L: any;
export var globalMap: any;

@Injectable({
    providedIn: 'root'
})
export class MapService {
    NVSK: boolean = true;
    parentThis = this

    width = window.innerWidth;
    // mapName = environment.mapName;
    mapCenterLatlng: any;
    latitude: any;
    longitude: any;
    zoomLevel: any;

    constructor(private readonly _spinner:NgxSpinnerService) {
        if (environment.config == 'VSK') {
            this.NVSK = false
            this.mapCenterLatlng = config.default['GJ'];
        }
        else {
            this.mapCenterLatlng = config.default['IN'];
        }
        
        this.zoomLevel = this.width > 3820 ? this.mapCenterLatlng.zoomLevel + 0.85 : this.width < 3820 && this.width >= 2500 ? this.mapCenterLatlng.zoomLevel + 0.3 : this.width < 2500 && this.width > 1920 ? this.mapCenterLatlng.zoomLevel : this.width > 1500 ? this.mapCenterLatlng.zoomLevel - 0.4 : this.width > 1336 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.width > 1200 ? this.mapCenterLatlng.zoomLevel - 0.75 : this.width > 700 ? this.mapCenterLatlng.zoomLevel - 0.3 : this.width > 76 ? this.mapCenterLatlng.zoomLevel - 0.5 : this.width > 400 ? this.mapCenterLatlng.zoomLevel - 0.6 : this.width > 320 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.mapCenterLatlng.zoomLevel;
    }



    onResize() {
        this.width = window.innerWidth;
        this.zoomLevel = this.width > 3820 ? this.mapCenterLatlng.zoomLevel + 0.85 : this.width < 3820 && this.width >= 2500 ? this.mapCenterLatlng.zoomLevel + 0.3 : this.width < 2500 && this.width > 1920 ? this.mapCenterLatlng.zoomLevel : this.width > 1500 ? this.mapCenterLatlng.zoomLevel - 0.4 : this.width > 1336 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.width > 1200 ? this.mapCenterLatlng.zoomLevel - 0.75 : this.width > 700 ? this.mapCenterLatlng.zoomLevel - 0.3 : this.width > 76 ? this.mapCenterLatlng.zoomLevel - 0.5 : this.width > 400 ? this.mapCenterLatlng.zoomLevel - 0.6 : this.width > 320 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.mapCenterLatlng.zoomLevel;
        this.setMarkerRadius();
    }

    public map: any
    //Initialisation of Map  
    async initMap(map: any, maxBounds: any, markers: any, state: Number) {
        this._spinner.show()
        if (environment.config == 'VSK') {
            this.NVSK = false;
            this.mapCenterLatlng = config.default[`${environment.stateCode}`]
        }
        else {
            switch (state) {
                case 0:
                    console.log('here')
                    this.mapCenterLatlng = config.default['IN'];
                    break;
                case 5:
                    this.mapCenterLatlng = config.default['BR'];
                    break;
                case 13: 
                    this.mapCenterLatlng = config.default['HR'];
                    break;
                case 12:
                    this.mapCenterLatlng = config.default['GJ'];
                    break;
                case 24:
                    this.mapCenterLatlng = config.default['ML'];
                    break;
            }
        }
        this.zoomLevel = this.width > 3820 ? this.mapCenterLatlng.zoomLevel + 0.85 : this.width < 3820 && this.width >= 2500 ? this.mapCenterLatlng.zoomLevel + 0.3 : this.width < 2500 && this.width > 1920 ? this.mapCenterLatlng.zoomLevel : this.width > 1500 ? this.mapCenterLatlng.zoomLevel - 0.4 : this.width > 1336 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.width > 1200 ? this.mapCenterLatlng.zoomLevel - 0.75 : this.width > 700 ? this.mapCenterLatlng.zoomLevel - 0.3 : this.width > 76 ? this.mapCenterLatlng.zoomLevel - 0.5 : this.width > 400 ? this.mapCenterLatlng.zoomLevel - 0.6 : this.width > 320 ? this.mapCenterLatlng.zoomLevel - 0.8 : this.mapCenterLatlng.zoomLevel;

        let reportTypeETB: any;
        let NVSK = this.NVSK;

        if (globalMap) {
            globalMap.remove();
            console.log('removed');
        }

        if (markers[0].perfomance || markers[0].Performance) {
            reportTypeETB = false;
        }
        else {
            reportTypeETB = true;
        }
        // markers[0]
        console.log('initializing');
        globalMap = L.map(map, { zoomSnap: 0.25, zoomControl: false, scrollWheelZoom: false, touchZoom: false, maxBounds: [this.mapCenterLatlng.lat, this.mapCenterLatlng.lng] }).setView([this.mapCenterLatlng.lat, this.mapCenterLatlng.lng], this.zoomLevel);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
            {
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
                maxZoom: this.zoomLevel + 10
            }
        ).addTo(globalMap);

        function getZoneColor(e: any) {
            if (reportTypeETB) {
                console.log(e);
                if (e == "Yes") {
                    return "#36a732"
                } else {
                    return "grey"
                }
            }
            else {
                return e > 90 ? "#002966" :
                    e > 80 ? "#003d99" :
                        e > 70 ? "#0052cc" :
                            e > 50 ? "#0066ff" :
                                e > 40 ? "#1a75ff" :
                                    e > 30 ? "#4d94ff" :
                                        e > 20 ? "#80b3ff" :
                                            e > 10 ? "#b3d1ff" :
                                                e > 0 ? "#cce0ff" :
                                                    "#e6f0ff";
            }

        }

        function style_states1(feature: any) {
            let check: any = '';
            if (reportTypeETB) {
                if (NVSK && !state) {
                    markers.forEach((states: any) => {
                        if (states['Location Code']) {
                            if (states['Location Code'] == (typeof feature?.properties?.state_code === 'number' ? feature?.properties?.state_code : feature?.properties?.state_code?.trim())) {
                                check = states?.status?.split(':')[1]?.trim()
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = feature?.properties?.st_nm + ' : ' + check;
                                }
                            }
                        } else {
                            if (states?.Location?.trim().toLowerCase() == feature?.properties?.st_nm?.trim().toLowerCase()) {
                                check = states?.status?.split(':')[1]?.trim()
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = feature?.properties?.st_nm + ' : ' + check;
                                }
                            }
                        }
                    })
                }
                else {
                    markers.forEach((district: any) => {
                        if (district['Location Code']) {
                            if (district['Location Code'] == (typeof feature?.properties?.ID_0 === 'number' ? feature?.properties?.ID_0 : feature?.properties?.state_code?.trim())) {
                                check = district?.status?.split(':')[1]?.trim()
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = feature?.properties?.NAME_2 + ' : ' + check;
                                }
                            }
                        }else {
                        if (district?.Location?.trim().toLowerCase() == feature?.properties?.NAME_2?.trim().toLowerCase()) {
                            check = district?.status?.split(':')[1]?.trim()
                            if (feature.properties) {
                                feature.properties['popUpContent'] = feature?.properties?.NAME_2 + ' : ' + check;
                            }
                        }
                    }
                    })
                }
            }
            else {
                if (NVSK && !state) {
                    markers.forEach((states: any) => {
                        if (states['Location Code']) {
                            if (states['Location Code'] == (typeof feature?.properties?.state_code === 'number' ? feature?.properties?.state_code : feature?.properties?.state_code?.trim())) {
                                let performance = states.perfomance ? states.perfomance : states.Performance;
                                check = typeof performance === 'string' ? Number(states?.perfomance?.split(':')[1]?.trim()) : performance;
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = 'Performance of ' + feature?.properties?.st_nm + ' is ' + check + '%';
                                }
                            }
                        } else {
                            if (states?.Location?.trim().toLowerCase() == feature?.properties?.st_nm?.trim().toLowerCase()) {
                                let performance = states.perfomance ? states.perfomance : states.Performance;
                                check = typeof performance === 'string' ? Number(states?.perfomance?.split(':')[1]?.trim()) : performance;
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = 'Performance of ' + feature?.properties?.st_nm + ' is ' + check + '%';
                                }
                            }
                        }
                    })
                }
                else {
                    markers.forEach((district: any) => {
                        if (district['Location Code']) {
                            if (district['Location Code'] == (typeof feature?.properties?.ID_0 === 'number' ? feature?.properties?.ID_0 : feature?.properties?.state_code?.trim())) {
                                let performance = district.perfomance ? district.perfomance : district.Performance;
                                check = typeof performance === 'string' ? Number(district?.perfomance?.split(':')[1]?.trim()) : performance;
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = 'Performance of ' + feature?.properties?.NAME_2 + ' is ' + check + '%';
                                }
                            }
                        } else {
                            if (district?.Location?.trim().toLowerCase() == feature?.properties?.NAME_2?.trim().toLowerCase()) {
                                let performance = district.perfomance ? district.perfomance : district.Performance;
                                check = typeof performance === 'string' ? Number(district?.perfomance?.split(':')[1]?.trim()) : performance;
                                if (feature.properties) {
                                    feature.properties['popUpContent'] = 'Performance of ' + feature?.properties?.NAME_2 + ' is ' + check + '%';
                                }
                            }
                        }
                    })
                }
            }

            return {
                fillColor: '#fff',
                weight: 1,
                opacity: 1,
                color: 'grey',
                dashArray: '0',
                fillOpacity: 1
            };
        }

        if (this.NVSK && !state) {
            const response = await fetch(`${environment.apiURL}/assets/geo-locations/IN.json`);
            const body = await response.json();
            var data = body;
        }
        else {
            const response = await fetch(`${environment.apiURL}/assets/geo-locations/${environment.stateCode}.json`);
            const body = await response.json();
            var data = body;
        }

        function applyCountryBorder(map: any, NVSK: any) {
            L.geoJSON(data['features'], {
                style: style_states1,
                color: "#a0a1a3",
                weight: 1,
                fillOpacity: 0,
                fontWeight: "bold",
                onEachFeature: function (feature: any, layer: any) {
                    //layer.bindTooltip('<h3>' + feature?.properties?.popUpContent + '</h3>', { closeButton: false, offset: L.point(0, -20) });
                }
            }).addTo(map);
        }

        var legend = L.control({ position: 'topright' });
        legend.onAdd = function (map: any) {

            let labels: any[] = [];
            let values: any[] = [];

            var div = L.DomUtil.create('div', 'info legend');
            if (reportTypeETB) {
                labels = ['<strong>State & NCERT adopted:</strong>'];
                values = ["Yes", "No"];
                for (var i = 0; i < values.length; i++) {

                    div.innerHTML +=
                        labels.push('<i class="fa fa-square" style="color:' + getZoneColor(values[i]) + '"></i> ' + values[i]);

                }
            }
            else {
                labels = ['<strong>Performance</strong>'];
                values = ['100', '90', '80', '70', '60', '50', '40', '30', '20', '10'];
                for (var i = 0; i < values.length; i++) {

                    div.innerHTML +=
                        labels.push(
                            '<i class="fa  fa-square" style="color:' + getZoneColor(Number(values[i]) - 1) + '"></i><span class="h6">' +
                            ' ' + (values[i + 1] ? values[i + 1] + '&ndash;' : '0 &ndash;') + values[i] + ' %' + '</span>');

                }
            }



            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(globalMap);
        applyCountryBorder(globalMap, this.NVSK);
        this.map = globalMap
        this._spinner.hide()
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
    getMarkerRadius(rad1: any, rad2: any, rad3: any, rad4: any) {
        let radius = this.width > 3820 ? rad1 : this.width > 2500 && this.width < 3820 ? rad2 : this.width < 2500 && this.width > 1920 ? rad3 : rad4;
        return radius;
    }

    setMarkerRadius() {
        this.markersIcons.map((markerIcon: any) => {
            markerIcon.setRadius(this.getMarkerRadius(18, 14, 10, 4));
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




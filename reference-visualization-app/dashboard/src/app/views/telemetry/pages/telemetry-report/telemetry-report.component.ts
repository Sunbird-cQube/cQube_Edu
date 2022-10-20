import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import * as R from 'leaflet-responsive-popup';
import { environment } from 'src/environments/environment';
import { AppServiceComponent } from 'src/app/app.service';
import { MapService,globalMap } from 'src/app/core/services/mapservices/maps.services';
import { TelemetryService } from 'src/app/core/services/core-apis/telemetry-report.service';

@Component({
  selector: 'app-telemetry-report',
  templateUrl: './telemetry-report.component.html',
  styleUrls: ['./telemetry-report.component.scss']
})
export class TelemetryReportComponent implements OnInit {

  public title: string = '';
  public titleName: string = '';
  public colors: any;

  // to assign the count of below values to show in the UI footer
  public studentCount: any;
  public schoolCount: any;
  public dateRange: any = '';

  // to hide and show the hierarchy details
  public skul: boolean = true;
  public dist: boolean = false;
  public blok: boolean = false;
  public clust: boolean = false;

  // to hide the blocks and cluster dropdowns
  public blockHidden: boolean = true;
  public clusterHidden: boolean = true;

  // to set the hierarchy names
  public districtHierarchy: any = '';
  public blockHierarchy: any = '';
  public clusterHierarchy: any = '';

  // leaflet layer dependencies
  public layerMarkers = new L.layerGroup();
  public markersList = new L.FeatureGroup();

  // assigning the data to each of these to show in dropdowns and maps
  // for dropdowns
  public data: any;
  public markers: any = [];
  // for maps
  public districtMarkers: any = [];
  public blockMarkers: any = [];
  public clusterMarkers: any = [];
  public schoolMarkers: any = [];

  public waterMark = environment.water_mark
  // to show and hide the dropdowns based on the selection of buttons
  public stateLevel: any = 0; // 0 for buttons and 1 for dropdowns

  // to download the excel report
  public fileName: any;
  public reportData: any = [];

  // variables
  public districtId: any = '';
  public blockId: any = '';
  public clusterId: any = '';

  public myData;

  timePeriod = '';
  timeDetails = [{ id: "overall", time: "Over All" }, { id: "last_30_days", time: "Last 30 Days" }, { id: "last_7_days", time: "Last 7 Days" }, { id: "last_day", time: "Last Day" }];
  state: string;
  // initial center position for the map
  public lat: any;
  public lng: any;

  reportName = 'telemerty';
  level = "District";

  mapName;
  googleMapZoom = 7;
  geoJson = this.globalService.geoJson;

  constructor(
    public http: HttpClient,
    public service: TelemetryService,
    public commonService: AppServiceComponent,
    public router: Router,
    private changeDetection: ChangeDetectorRef,
    public globalService: MapService,
  ) {
  }

  width = window.innerWidth;
  height = window.innerHeight;
  onResize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  public userAccessLevel = localStorage.getItem("userLevel");
  public hideIfAccessLevel: boolean = false

  ngOnInit() {
    setTimeout(() => {
      this.initMap();
    }, 100);
  }

  initMap() {
    this.mapName = this.commonService.mapName;
    this.state = this.commonService.state;
    this.lat = this.globalService.mapCenterLatlng.lat;
    this.lng = this.globalService.mapCenterLatlng.lng;
    this.changeDetection.detectChanges();
    this.globalService.initMap('map', [[this.lat, this.lng]]);
    // document.getElementById('accessProgressCard').style.display = 'none';
    //document.getElementById('backBtn') ?document.getElementById('backBtn').style.display = 'none' : "";
    // document.getElementById('home') ? document.getElementById('home').style.display = 'block' : "";
    this.timePeriod = 'overall';
    this.levelWiseFilter();

    if (environment.auth_api !== 'cqube') {
      if (this.userAccessLevel !== "" || undefined) {
        this.hideIfAccessLevel = true;
      }
    }
  }

  getDaysInMonth = function (month, year) {
    return new Date(year, month, 0).getDate();
  };

  getTimePeriod(timePeriod) {
    this.levelWiseFilter();
  }

  levelWiseFilter() {
    if (this.skul) {
      this.districtWise();
    }
    if (this.dist) {
      this.blockWise();
    }
    if (this.blok) {
      this.clusterWise();
    }
    if (this.clust) {
      this.schoolWise();
    }
  }

  homeClick() {
    this.skul = true;
    this.levelWiseFilter();
  }

  // to load all the districts for state data on the map
  districtWise() {
    try {
      // to clear the existing data on the map layer
      globalMap.removeLayer(this.markersList);
      this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
      this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
      this.layerMarkers.clearLayers();
      this.level = "District";
      this.districtId = undefined;
      this.commonService.errMsg();

      // these are for showing the hierarchy names based on selection
      this.skul = true;
      this.dist = false;
      this.blok = false;
      this.clust = false;

      // to show and hide the dropdowns
      this.blockHidden = true;
      this.clusterHidden = true;

      var obj = {
        timePeriod: this.timePeriod
      }

      globalMap.setView(new L.LatLng(this.lat, this.lng), this.globalService.zoomLevel);
      // api call to get all the districts data
      if (this.myData) {
        this.myData.unsubscribe();
      }
      this.myData = this.service.telemetryDist(obj).subscribe(res => {
        this.markers = this.data = res['data'];
        // to show only in dropdowns
        this.districtMarkers = this.data['data'];

        // options to set for markers in the map
        let options = {
          radius: 6,
          mapZoom: this.globalService.zoomLevel,
          centerLat: this.lat,
          centerLng: this.lng,
          level: 'District'
        }
        this.globalService.onResize(options.level);
        this.fileName = `${this.reportName}_allDistricts_${this.timePeriod}_${this.commonService.dateAndTime}`;
        this.genericFun(this.data, options, this.fileName);

        // sort the districtname alphabetically
        this.districtMarkers.sort((a, b) => (a.districtName > b.districtName) ? 1 : ((b.districtName > a.districtName) ? -1 : 0));
      }, err => {
        this.data = [];
        this.commonService.loaderAndErr(this.data);
      });
      // adding the markers to the map layers
      globalMap.addLayer(this.layerMarkers);


    } catch (e) {
      console.log(e);
    }
  }

  // to load all the blocks for state data on the map
  blockWise() {
    try {
      // to clear the existing data on the map layer
      globalMap.removeLayer(this.markersList);
      this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
      this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
      this.layerMarkers.clearLayers();
      this.level = "Block";
      this.commonService.errMsg();
      this.reportData = [];
      this.districtId = undefined;
      this.blockId = undefined;
      // these are for showing the hierarchy names based on selection
      this.skul = false;
      this.dist = true;
      this.blok = false;
      this.clust = false;

      // to show and hide the dropdowns
      this.blockHidden = true;
      this.clusterHidden = true;

      var obj = {
        timePeriod: this.timePeriod
      }

      globalMap.setView(new L.LatLng(this.lat, this.lng), this.globalService.zoomLevel);
      // api call to get the all clusters data
      if (this.myData) {
        this.myData.unsubscribe();
      }
      this.myData = this.service.telemetryBlock(obj).subscribe(res => {
        this.data = res['data']
        let options = {
          radius: 4,
          mapZoom: this.globalService.zoomLevel,
          centerLat: this.lat,
          centerLng: this.lng,
          level: "Block"
        }
        this.globalService.featureGrp.clearLayers();
        if (this.data['data'].length > 0) {
          let result = this.data['data']
          this.blockMarkers = [];
          this.markers = this.blockMarkers = result;
          if (this.blockMarkers.length !== 0) {
            for (let i = 0; i < this.blockMarkers.length; i++) {

              var markerIcon = this.globalService.initMarkers1(this.blockMarkers[i].lat, this.blockMarkers[i].lng, "#1f4b91", 1, 1, options.level);
              this.generateToolTip(this.blockMarkers[i], options.level, markerIcon, "lat", "lng");
            }
            // to download the report
            this.fileName = `${this.reportName}_allBlocks_${this.timePeriod}_${this.commonService.dateAndTime}`;
            this.schoolCount = this.data['footer'];

            this.commonService.loaderAndErr(this.data);
            this.changeDetection.markForCheck();
            this.globalService.getBoundsByMarkers();
          }
        }
        this.globalService.onResize(options.level);
      }, err => {
        this.data = [];
        this.commonService.loaderAndErr(this.data);
      });
      globalMap.addLayer(this.layerMarkers);

    } catch (e) {
      console.log(e);
    }
  }

  // to load all the clusters for state data on the map
  clusterWise() {
    try {
      // to clear the existing data on the map layer
      globalMap.removeLayer(this.markersList);
      this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
      this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
      this.layerMarkers.clearLayers();
      this.level = "Cluster";
      this.commonService.errMsg();
      this.reportData = [];
      this.districtId = undefined;
      this.blockId = undefined;
      this.clusterId = undefined;

      // these are for showing the hierarchy names based on selection
      this.skul = false;
      this.dist = false;
      this.blok = true;
      this.clust = false;

      // to show and hide the dropdowns
      this.blockHidden = true;
      this.clusterHidden = true;

      var obj = {
        timePeriod: this.timePeriod
      }

      globalMap.setView(new L.LatLng(this.lat, this.lng), this.globalService.zoomLevel);
      // api call to get the all clusters data
      if (this.myData) {
        this.myData.unsubscribe();
      }
      this.myData = this.service.telemetryCluster(obj).subscribe(res => {
        this.data = res['data']
        let options = {
          radius: 3,
          mapZoom: this.globalService.zoomLevel,
          centerLat: this.lat,
          centerLng: this.lng,
          level: "Cluster"
        }
        this.globalService.featureGrp.clearLayers();
        if (this.data['data'].length > 0) {
          let result = this.data['data']
          this.clusterMarkers = [];
          this.markers = this.clusterMarkers = result;

          if (this.clusterMarkers.length !== 0) {
            for (let i = 0; i < this.clusterMarkers.length; i++) {
              var markerIcon = this.globalService.initMarkers1(this.clusterMarkers[i].lat, this.clusterMarkers[i].lng, "#1f4b91", 2, 1, options.level);
              this.generateToolTip(this.clusterMarkers[i], options.level, markerIcon, "lat", "lng");
            }
            // to download the report
            this.fileName = `${this.reportName}_allClusters_${this.timePeriod}_${this.commonService.dateAndTime}`;
            this.schoolCount = this.data['footer'];

            this.commonService.loaderAndErr(this.data);
            this.changeDetection.markForCheck();
            this.globalService.getBoundsByMarkers();
          }
        }
        this.globalService.onResize(options.level);
      }, err => {
        this.data = [];
        this.commonService.loaderAndErr(this.data);
      });
      globalMap.addLayer(this.layerMarkers);

    } catch (e) {
      console.log(e);
    }
  }

  // to load all the schools for state data on the map
  schoolWise() {
    try {
      // to clear the existing data on the map layer
      globalMap.removeLayer(this.markersList);
      this.globalService.latitude = this.lat = this.globalService.mapCenterLatlng.lat;
      this.globalService.longitude = this.lng = this.globalService.mapCenterLatlng.lng;
      this.layerMarkers.clearLayers();
      this.level = "School";
      this.commonService.errMsg();
      this.reportData = [];
      // these are for showing the hierarchy names based on selection
      this.skul = false;
      this.dist = false;
      this.blok = false;
      this.clust = true;

      // to show and hide the dropdowns
      this.blockHidden = true;
      this.clusterHidden = true;

      var obj = {
        timePeriod: this.timePeriod
      }

      globalMap.setView(new L.LatLng(this.lat, this.lng), this.globalService.zoomLevel);
      // api call to get the all schools data
      if (this.myData) {
        this.myData.unsubscribe();
      }
      this.myData = this.service.telemetrySchool(obj).subscribe(res => {
        this.data = res['data']
        let options = {
          radius: 1.5,
          mapZoom: this.globalService.zoomLevel,
          centerLat: this.lat,
          centerLng: this.lng,
          level: "School"
        }
        this.globalService.featureGrp.clearLayers();
        this.schoolMarkers = [];
        if (this.data['data'].length > 0) {
          let result = this.data['data']

          this.markers = this.schoolMarkers = result;
          if (this.schoolMarkers.length !== 0) {
            for (let i = 0; i < this.schoolMarkers.length; i++) {
              var markerIcon = this.globalService.initMarkers1(this.schoolMarkers[i].lat, this.schoolMarkers[i].lng, "#1f4b91", 2, 0.3, options.level);
              this.generateToolTip(this.schoolMarkers[i], options.level, markerIcon, "lat", "lng");
            }
            // to download the report
            this.fileName = `${this.reportName}_allSchools_${this.timePeriod}_${this.commonService.dateAndTime}`;
            this.schoolCount = this.data['footer'];

            this.commonService.loaderAndErr(this.data);
            this.changeDetection.markForCheck();
            this.globalService.getBoundsByMarkers();
          }
        }
        this.globalService.onResize(options.level);
      }, err => {
        this.data = [];
        this.commonService.loaderAndErr(this.data);
      });
      globalMap.addLayer(this.layerMarkers);

    } catch (e) {
      console.log(e);
    }
  }

  

  // common function for all the data to show in the map
  genericFun(data, options, fileName) {
    this.reportData = [];
    this.globalService.featureGrp.clearLayers();
    if (data['data'].length > 0) {
      this.markers = data['data']

      // attach values to markers
      for (var i = 0; i < this.markers.length; i++) {
        var lat, strLat; var lng, strLng;
        if (options.level == "district") {
          lat = this.markers[i].district_latitude;
          strLat = "district_latitude";
          lng = this.markers[i].district_longitude;
          strLng = "district_longitude";
        }
        if (options.level == "block") {
          lat = this.markers[i].block_latitude;
          strLat = "block_latitude";
          lng = this.markers[i].block_longitude;
          strLng = "block_longitude";
        }
        if (options.level == "cluster") {
          lat = this.markers[i].cluster_latitude;
          strLat = "cluster_latitude";
          lng = this.markers[i].cluster_longitude;
          strLng = "cluster_longitude";
        }
        if (options.level == "school") {
          lat = this.markers[i].school_latitude;
          strLat = "school_latitude";
          lng = this.markers[i].school_longitude;
          strLng = "school_longitude";
        }

        var markerIcon = this.globalService.initMarkers1(this.markers[i].lat, this.markers[i].lng, "#1f4b91", options.strokeWeight, 1, options.level);

        // data to show on the tooltip for the desired levels
        if (options.level) {
          this.generateToolTip(this.markers[i], options.level, markerIcon, "lat", "lng");
          this.fileName = fileName;
        }
      }

      this.commonService.loaderAndErr(this.data);
      this.changeDetection.markForCheck();
      this.globalService.getBoundsByMarkers();
    }
    this.schoolCount = this.data['footer'];
  }

  popups(markerIcon, markers, level) {
    for (var i = 0; i < this.markers.length; i++) {
      markerIcon.on('mouseover', function (e) {
        this.openPopup();
      });
      markerIcon.on('mouseout', function (e) {
        this.closePopup();
      });

      this.layerMarkers.addLayer(markerIcon);
      // if (level != 'school') {
      //   markerIcon.on('click', this.onClick_Marker, this)
      // }
      markerIcon.myJsonData = markers;
    }
  }

  //Showing tooltips on markers on mouse hover...
  onMouseOver(m, infowindow) {
    m.lastOpen = infowindow;
    m.lastOpen.open();
  }

  // google maps
  mouseOverOnmaker(infoWindow, $event: MouseEvent): void {
    infoWindow.open();
  }

  mouseOutOnmaker(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }

  //Hide tooltips on markers on mouse hover...
  hideInfo(m) {
    if (m.lastOpen != null) {
      m.lastOpen.close();
    }
  }

  // drilldown/ click functionality on markers
  onClick_Marker(event) {
    var data = event.target.myJsonData;
  }

  // to download the excel report
  downloadReport() {
    this.commonService.download(this.fileName, this.reportData);
  }

  generateToolTip(markers, level, markerIcon, lat, lng) {
    this.popups(markerIcon, markers, level);
    var details = {};
    var orgObject = {};
    let remIcon = {};
    if (this.mapName == 'googlemap') {
      Object.keys(markers).forEach(key => {
        if (key !== 'icon') {
          remIcon[key] = markers[key];
        }
      });
    } else {
      remIcon = markers;
    }
    Object.keys(remIcon).forEach(key => {
      if (key !== lat) {
        details[key] = remIcon[key];
      }
    });
    Object.keys(details).forEach(key => {
      if (key !== lng) {
        orgObject[key] = details[key];

      }
    });
    var yourData;
    this.reportData.push(orgObject);
    yourData = this.globalService.getInfoFrom(orgObject, "", level, "telemetry", undefined, undefined).join(" <br>");

    //Generate dynamic tool-tip
    if (this.mapName != 'googlemap') {
      const popup = R.responsivePopup({ hasTip: false, autoPan: false, offset: [15, 20] }).setContent(
        yourData);
      markerIcon.addTo(globalMap).bindPopup(popup);
    } else {
      markers["label"] = yourData
    }
  }
}

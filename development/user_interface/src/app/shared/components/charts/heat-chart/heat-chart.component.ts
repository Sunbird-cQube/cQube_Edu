import { Component, Input, OnChanges, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import * as Highcharts from "highcharts/highstock";
import * as HighchartsMore from "highcharts/highcharts-more";
import * as highchartsHeatmap from 'highcharts/modules/heatmap';

const HighchartsMore2: any = HighchartsMore;
HighchartsMore2(Highcharts);

const highchartsHeatmap2: any = highchartsHeatmap;
highchartsHeatmap2(Highcharts);

@Component({
  selector: 'app-heat-chart',
  templateUrl: './heat-chart.component.html',
  styleUrls: ['./heat-chart.component.scss']
})
export class HeatChartComponent implements OnInit, OnChanges {

  chart!: Highcharts.Chart;
  @Input() height: number | string = 'auto';
  @Input() title!: string;
  @Input() options: Highcharts.Options | undefined;
  @ViewChild('container') container: any;
  @Input() data: any = {
    "yLabel": [
      "do_987654322/Clinical Management - COVID-19",
      "do_987654323/COVID-19 Infection Control",
      "do_9876543/COVID Awareness - Hindi",
      "do_876543213/Course on Teaching of Social Science",
      "do_876543211/Experiential Learning Course",
      "do_987654325/ICU Care and Ventilation Management",
      "do_876543210/CBSE Science Challenge",
      "do_987654321/Fabricating Audio-Video based Assessm",
      "do_876543212/ICSE_School Based Assessment"
    ],
    "zLabel": [
      "do_987654322/Clinical Management - COVID-19",
      "do_987654323/COVID-19 Infection Control",
      "do_9876543/COVID Awareness - Hindi",
      "do_876543213/Course on Teaching of Social Science",
      "do_876543211/Experiential Learning Course",
      "do_987654325/ICU Care and Ventilation Management",
      "do_876543210/CBSE Science Challenge",
      "do_987654321/Fabricating Audio-Video based Assessments",
      "do_876543212/ICSE_School Based Assessment"
    ],
    "xLabel": [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi - Csm Nagar",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Gorakhpur"
    ],
    "xLabelId": [
      915,
      912,
      945,
      948,
      973,
      932,
      961,
      908,
      950,
      958
    ],
    "data": [
      {
        "x": 0,
        "y": 0,
        "value": 90.8,
        "color": "#006837"
      },
      {
        "x": 1,
        "y": 0,
        "value": 65.2,
        "color": "#a6d96a"
      },
      {
        "x": 2,
        "y": 0,
        "value": 53.9,
        "color": "#d9ef8b"
      },
      {
        "x": 3,
        "y": 0,
        "value": 52.7,
        "color": "#d9ef8b"
      },
      {
        "x": 4,
        "y": 0,
        "value": 30.9,
        "color": "#fdae61"
      },
      {
        "x": 5,
        "y": 0,
        "value": 64,
        "color": "#a6d96a"
      },
      {
        "x": 6,
        "y": 0,
        "value": 25.9,
        "color": "#f46d43"
      },
      {
        "x": 7,
        "y": 0,
        "value": 68.7,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 0,
        "value": 77.8,
        "color": "#66bd63"
      },
      {
        "x": 9,
        "y": 0,
        "value": 96.4,
        "color": "#006837"
      },
      {
        "x": 0,
        "y": 1,
        "value": 78.6,
        "color": "#66bd63"
      },
      {
        "x": 1,
        "y": 1,
        "value": 30.8,
        "color": "#fdae61"
      },
      {
        "x": 2,
        "y": 1,
        "value": 94.8,
        "color": "#006837"
      },
      {
        "x": 3,
        "y": 1,
        "value": 64.7,
        "color": "#a6d96a"
      },
      {
        "x": 4,
        "y": 1,
        "value": 75,
        "color": "#66bd63"
      },
      {
        "x": 5,
        "y": 1,
        "value": 40.7,
        "color": "#fee08b"
      },
      {
        "x": 6,
        "y": 1,
        "value": 55.3,
        "color": "#d9ef8b"
      },
      {
        "x": 7,
        "y": 1,
        "value": 60.9,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 1,
        "value": 73,
        "color": "#66bd63"
      },
      {
        "x": 9,
        "y": 1,
        "value": 77.4,
        "color": "#66bd63"
      },
      {
        "x": 0,
        "y": 2,
        "value": 81.3,
        "color": "#1a9850"
      },
      {
        "x": 1,
        "y": 2,
        "value": 71.5,
        "color": "#66bd63"
      },
      {
        "x": 2,
        "y": 2,
        "value": 46.9,
        "color": "#fee08b"
      },
      {
        "x": 3,
        "y": 2,
        "value": 50.1,
        "color": "#d9ef8b"
      },
      {
        "x": 4,
        "y": 2,
        "value": 30.1,
        "color": "#fdae61"
      },
      {
        "x": 5,
        "y": 2,
        "value": 70.5,
        "color": "#66bd63"
      },
      {
        "x": 6,
        "y": 2,
        "value": 85.1,
        "color": "#1a9850"
      },
      {
        "x": 7,
        "y": 2,
        "value": 80.6,
        "color": "#1a9850"
      },
      {
        "x": 8,
        "y": 2,
        "value": 62.4,
        "color": "#a6d96a"
      },
      {
        "x": 9,
        "y": 2,
        "value": 95.3,
        "color": "#006837"
      },
      {
        "x": 0,
        "y": 3,
        "value": 95.8,
        "color": "#006837"
      },
      {
        "x": 1,
        "y": 3,
        "value": 76,
        "color": "#66bd63"
      },
      {
        "x": 2,
        "y": 3,
        "value": 69.3,
        "color": "#a6d96a"
      },
      {
        "x": 3,
        "y": 3,
        "value": 56.1,
        "color": "#d9ef8b"
      },
      {
        "x": 4,
        "y": 3,
        "value": null,
        "color": "white"
      },
      {
        "x": 5,
        "y": 3,
        "value": 40.5,
        "color": "#fee08b"
      },
      {
        "x": 6,
        "y": 3,
        "value": 63.7,
        "color": "#a6d96a"
      },
      {
        "x": 7,
        "y": 3,
        "value": 68.8,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 3,
        "value": 75.2,
        "color": "#66bd63"
      },
      {
        "x": 9,
        "y": 3,
        "value": 54,
        "color": "#d9ef8b"
      },
      {
        "x": 0,
        "y": 4,
        "value": 80.6,
        "color": "#1a9850"
      },
      {
        "x": 1,
        "y": 4,
        "value": 61.2,
        "color": "#a6d96a"
      },
      {
        "x": 2,
        "y": 4,
        "value": 82.8,
        "color": "#1a9850"
      },
      {
        "x": 3,
        "y": 4,
        "value": 73.8,
        "color": "#66bd63"
      },
      {
        "x": 4,
        "y": 4,
        "value": 68,
        "color": "#a6d96a"
      },
      {
        "x": 5,
        "y": 4,
        "value": 48.3,
        "color": "#fee08b"
      },
      {
        "x": 6,
        "y": 4,
        "value": 37.9,
        "color": "#fdae61"
      },
      {
        "x": 7,
        "y": 4,
        "value": 27,
        "color": "#f46d43"
      },
      {
        "x": 8,
        "y": 4,
        "value": 66.2,
        "color": "#a6d96a"
      },
      {
        "x": 9,
        "y": 4,
        "value": 78.3,
        "color": "#66bd63"
      },
      {
        "x": 0,
        "y": 5,
        "value": 96,
        "color": "#006837"
      },
      {
        "x": 1,
        "y": 5,
        "value": 62.3,
        "color": "#a6d96a"
      },
      {
        "x": 2,
        "y": 5,
        "value": 76.5,
        "color": "#66bd63"
      },
      {
        "x": 3,
        "y": 5,
        "value": 67.8,
        "color": "#a6d96a"
      },
      {
        "x": 4,
        "y": 5,
        "value": 69.8,
        "color": "#a6d96a"
      },
      {
        "x": 5,
        "y": 5,
        "value": 37.3,
        "color": "#fdae61"
      },
      {
        "x": 6,
        "y": 5,
        "value": 14.9,
        "color": "#d73027"
      },
      {
        "x": 7,
        "y": 5,
        "value": 68.8,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 5,
        "value": 78.4,
        "color": "#66bd63"
      },
      {
        "x": 9,
        "y": 5,
        "value": 82.6,
        "color": "#1a9850"
      },
      {
        "x": 0,
        "y": 6,
        "value": 94,
        "color": "#006837"
      },
      {
        "x": 1,
        "y": 6,
        "value": 75.7,
        "color": "#66bd63"
      },
      {
        "x": 2,
        "y": 6,
        "value": 55.6,
        "color": "#d9ef8b"
      },
      {
        "x": 3,
        "y": 6,
        "value": 44.7,
        "color": "#fee08b"
      },
      {
        "x": 4,
        "y": 6,
        "value": 27.5,
        "color": "#f46d43"
      },
      {
        "x": 5,
        "y": 6,
        "value": 37.5,
        "color": "#fdae61"
      },
      {
        "x": 6,
        "y": 6,
        "value": 71.5,
        "color": "#66bd63"
      },
      {
        "x": 7,
        "y": 6,
        "value": 69.6,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 6,
        "value": 81.3,
        "color": "#1a9850"
      },
      {
        "x": 9,
        "y": 6,
        "value": 52,
        "color": "#d9ef8b"
      },
      {
        "x": 0,
        "y": 7,
        "value": 78.8,
        "color": "#66bd63"
      },
      {
        "x": 1,
        "y": 7,
        "value": 79.5,
        "color": "#66bd63"
      },
      {
        "x": 2,
        "y": 7,
        "value": 60.8,
        "color": "#a6d96a"
      },
      {
        "x": 3,
        "y": 7,
        "value": 42.6,
        "color": "#fee08b"
      },
      {
        "x": 4,
        "y": 7,
        "value": 26.4,
        "color": "#f46d43"
      },
      {
        "x": 5,
        "y": 7,
        "value": 40.5,
        "color": "#fee08b"
      },
      {
        "x": 6,
        "y": 7,
        "value": 80.8,
        "color": "#1a9850"
      },
      {
        "x": 7,
        "y": 7,
        "value": 72.1,
        "color": "#66bd63"
      },
      {
        "x": 8,
        "y": 7,
        "value": 78.4,
        "color": "#66bd63"
      },
      {
        "x": 9,
        "y": 7,
        "value": 76.6,
        "color": "#66bd63"
      },
      {
        "x": 0,
        "y": 8,
        "value": 60.4,
        "color": "#a6d96a"
      },
      {
        "x": 1,
        "y": 8,
        "value": 49,
        "color": "#fee08b"
      },
      {
        "x": 2,
        "y": 8,
        "value": 56.2,
        "color": "#d9ef8b"
      },
      {
        "x": 3,
        "y": 8,
        "value": 29,
        "color": "#f46d43"
      },
      {
        "x": 4,
        "y": 8,
        "value": 41.3,
        "color": "#fee08b"
      },
      {
        "x": 5,
        "y": 8,
        "value": 75.2,
        "color": "#66bd63"
      },
      {
        "x": 6,
        "y": 8,
        "value": 79.8,
        "color": "#66bd63"
      },
      {
        "x": 7,
        "y": 8,
        "value": 69.3,
        "color": "#a6d96a"
      },
      {
        "x": 8,
        "y": 8,
        "value": 58.8,
        "color": "#d9ef8b"
      },
      {
        "x": 9,
        "y": 8,
        "value": 69.2,
        "color": "#a6d96a"
      }
    ],
    "tooltipData": [
      {
        "x": 0,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 0,
        "indicator": "Clinical Management - COVID-19",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 1,
        "indicator": "COVID-19 Infection Control",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 2,
        "indicator": "COVID Awareness - Hindi",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 3,
        "indicator": "",
        "name": ""
      },
      {
        "x": 5,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 3,
        "indicator": "Course on Teaching of Social Science",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 4,
        "indicator": "Experiential Learning Course",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 5,
        "indicator": "ICU Care and Ventilation Management",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 6,
        "indicator": "CBSE Science Challenge",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 7,
        "indicator": "Fabricating Audio-Video based Assessments",
        "name": "Gorakhpur"
      },
      {
        "x": 0,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Agra"
      },
      {
        "x": 1,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Aligarh"
      },
      {
        "x": 2,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Allahabad"
      },
      {
        "x": 3,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Ambedkar Nagar"
      },
      {
        "x": 4,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Amethi - Csm Nagar"
      },
      {
        "x": 5,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Auraiya"
      },
      {
        "x": 6,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Azamgarh"
      },
      {
        "x": 7,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Baghpat"
      },
      {
        "x": 8,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Bahraich"
      },
      {
        "x": 9,
        "y": 8,
        "indicator": "ICSE_School Based Assessment",
        "name": "Gorakhpur"
      }
    ]
  }

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.createHeatChart();
    }, 100);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  createHeatChart(): void {
    let ref: HeatChartComponent = this;
    let defaultOptions: Highcharts.Options = {
      chart: {
        type: 'heatmap',
        marginTop: 80,
        marginBottom: 80
      },
      title: {
        text: 'Sales per employee per weekday'
      },
      xAxis: {
        categories: this.data.xLabel,
        opposite: true
      },
      yAxis: {
        categories: this.data.yLabel
      },
      colorAxis: {
        min: 0,
        minColor: '#FFFFFF',
        maxColor: '#1D4586'
      },
      legend: {
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
      },
      tooltip: {
        formatter: function () {
          console.log(this)
          return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> - ' + this.series.yAxis.categories[Number(this.point.y)] + '<b> : ' + this.point.value + '</b>' 
        }
      },
      series: [{
        name: 'Sales per employee',
        borderWidth: 1,
        type: 'heatmap',
        data: this.data.data.map((obj:any) => {
          return [obj.x, obj.y, obj.value]
        }),

        dataLabels: {
          enabled: true,
          color: '#000000'
        }
      }]
    }
    this.chart = Highcharts.chart(this.container.nativeElement, defaultOptions, function (this: any) {
    });
  }
}

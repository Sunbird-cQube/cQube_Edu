import * as Highcharts from "highcharts/highstock";

export let HighchartsConfig: any = {
    xAxis: {
        labels: {
            style: {
                fontSize: '0.7rem'
            }
        }
    }
}

window.onresize = function() {
    if (window.innerWidth >= 1920) {
        HighchartsConfig = Highcharts.merge(HighchartsConfig, {
            xAxis: {
                labels: {
                    style: {
                        fontSize: '2rem'
                    }
                }
            }
        });
    }
}

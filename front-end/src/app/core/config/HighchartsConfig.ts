export const HighchartsConfig = {
    title: {
        fontSize: '13px',
        fontWeight: 'bold',
        fontFamily: 'Roboto',
        color: '#666666'
    },
    xAxis: {
        fontSize: '10px',
        fontFamily: 'segoe ui',
        title: {
            fontSize: '11px',
            fontFamily: 'Roboto'
        }
    },
    yAxis: {
        fontSize: '11px',
        fontFamily: 'segoe ui',
        title: {
            fontSize: '11px',
            fontFamily: 'Roboto',
            fontWeight: '500'
        }
    },
    dataLabels: {
        fontSize: '12px',
        fontFamily: 'segoe ui',
        fontWeight: '600'
    },
    legend: {
        fontSize: '12px',
        fontFamily: 'segoe ui',
        fontWeight: '600'
    },
    colors: {
        primary: '#199AB7',
        jaffa: '#ED7D31',
        gulfBlue: '#06124e',
        amber: '#FFC000',
        tarawera: '#084056',
        cyan: '#0AFFF0',
        primaryShade1: '#4bcae7',
        primaryShade2: '#a5e5f3'
    }
}

if (screen.width <= 1600) {
    HighchartsConfig.dataLabels.fontSize = '11px';
    HighchartsConfig.dataLabels.fontWeight = '600';

    HighchartsConfig.legend.fontSize = '11px';
}

window.onresize = function() {
    if (screen.width <= 1600) {
        HighchartsConfig.dataLabels.fontSize = '11px';
        HighchartsConfig.dataLabels.fontWeight = '600';
    
        HighchartsConfig.legend.fontSize = '11px';
    }
}


const dataSourceInfo = {
    statesEnergizedTextBooks: {
        map: {
            pathToFile: 'etb/ETB_states_running_program.json',
            columns: [
                {
                    name: "State",
                    property: "State",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "status",
                    property: "Energised textbooks (State & NCERT adopted)",
                    tooltipDesc: 'Energised textbooks (State & NCERT adopted:'
                }
            ],
            filters: []
        },
        loTable: {
            pathToFile: 'etb/ETB_energized_text_book_percentage.json',
            gaugeChart: {
                title: 'Overall ETB Coverage',
                aggegration: {
                    type: 'AVG',
                    column: 'State energised (ETB)',
                    against: "Total Physical textbooks excluding adopted (Curriculum+Supplementary)"
                },
                valueSuffix: "%"
            },
            columns: [
                {
                    name: "State Name",
                    property: "State Name"
                },
                {
                    name: "Total Circullum Textbooks",
                    property: "Total Physical textbooks excluding adopted (Curriculum+Supplementary)",
                    class: "text-center"
                },
                {
                    name: "Total Energized Textbooks",
                    property: "State energised (ETB)",
                    class: "text-center"
                },
                {
                    name: "% Energized Textbooks",
                    property: "ETB Coverage",
                    isHeatMapRequired: true,
				    color: '#002966'
                }
            ],
            filters: []
        }
    },
    qrCodeCoverageAcrossStates: {
        map: {
            pathToFile: 'etb/ETB_QR_coverage_across_states.json',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "Performance",
                    property: "QR Coverage",
                    tooltipDesc: ''
                }
            ],
            filters: []
        },
        barChart: {
            pathToFile: 'etb/ETB_QR_coverage_across_states.json',
            gaugeChart: {
                title: 'Overall ETB Coverage',
                aggegration: {
                    type: 'AVG',
                    column: 'QR covered',
                    against: "Total QR Count"
                },
                valueSuffix: "%"
            },
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "QR Coverage",
                    property: "QR Coverage"
                }
            ],
            filters: []
        }
    },
    totalPlaysPerCapita: {
        map: {
            pathToFile: 'etb/ETB_total_plays_per_capita.json',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "Location Code",
                    property: "State Code"
                },
                {
                    name: "Latitude",
                    property: "Latitude"
                },
                {
                    name: "Longitude",
                    property: "Longitude"
                },
                {
                    name: "Performance",
                    property: "Plays per capita ( 1st April 2020)",
                    tooltipDesc: ''
                }
            ],
            filters: []
        }
    }
}

module.exports = dataSourceInfo;

const dataSourceInfo = {
    statesEnergizedTextBooks: {
        map: {
            pathToFile: 'diksha_etb_program-started.json',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Energised textbooks (State & NCERT adopted)",
                    tooltip: {
                        name: "Energised textbooks (State & NCERT adopted)"
                    }
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Energised textbooks (State & NCERT adopted)'
                }
            }
        },
        loTable: {
            pathToFile: 'diksha_etb_etb-coverage.json',
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
                    property: "Total Energized (Live ETB)",
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
            pathToFile: 'diksha_etb_qr-coverage.json',
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "QR Coverage",
                    tooltip: {
                        name: "QR Code Content Coverage"
                    },
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'QR Coverage'
                },
                tooltip: {
                    reportTypeIndicator: 'percent'
                }
            }
        },
        barChart: {
            pathToFile: 'diksha_etb_qr-coverage.json',
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
            pathToFile: 'diksha_etb_plays-per-capita.json',
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "state",
                    isState: true,
                    tooltip: {
                        name: "State Name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Plays per capita ( 1st April 2020)",
                    tooltip: {
                        name: "Plays per Capita"
                    },
                },
                {
                    name: "state_code",
                    property: "State Code"
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Total Plays per Capita'
                }
            }
        }
    },
    totalLearningSessions: {
        barChart: {
            pathToFile: 'diksha_etb_learning-session.json',
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State Name",
                    property: "State Name",
                    isLocationName: true
                },
                {
                    name: "Total No of Plays (App and Portal)",
                    property: "Total No of Plays (App and Portal)",
                    aggegration: {
                        type: "SUM"
                    }
                }
            ],
            filters: [
                {
                    name: 'Medium',
                    column: 'medium_new'
                },
                {
                    name: 'Grade',
                    column: 'grade_new'
                },
                {
                    name: 'Subject',
                    column: 'Subject'
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;

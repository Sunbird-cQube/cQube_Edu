const dataSourceInfo = {
    statesEnergizedTextBooks: {
        map: {
            mainFilter: 'State Code',
            pathToFile: 'diksha_etb_program-started.json',
            locations: [
                {
                    name: "Location",
                    property: "State",
                    level: "district",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Energised textbooks (State & NCERT adopted)",
                    tooltip: {
                        name: "Textbooks Energized"
                    }
                },
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Textbooks Energized'
                }
            }
        },
        loTable: {
            mainFilter: 'State Code',
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
                    name: "State/UT name",
                    property: "State Name"
                },
                {
                    name: "Total Curriculum Textbooks",
                    property: "Total Physical textbooks excluding adopted (Curriculum+Supplementary)",
                    class: "text-center"
                },
                {
                    name: "Total Energized Textbooks",
                    property: "Total Energised (Live ETB)",
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
                    level: "district",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "QR Coverage",
                    tooltip: {
                        name: "Content Coverage on QR"
                    },
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Content Coverage on QR'
                },
                tooltip: {
                    reportTypeIndicator: 'percent'
                }
            }
        },
        barChart: {
            pathToFile: 'diksha_etb_qr-coverage.json',
            mainFilter: 'State Code',
            gaugeChart: {
                title: 'Content Coverage on QR',
                aggegration: {
                    type: 'AVG',
                    column: 'QR covered',
                    against: "Total QR Count"
                },
                valueSuffix: "%"
            },
            columns: [
                {
                    name: "State/UT name",
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
            mainFilter: 'State Code',
            locations: [
                {
                    name: "Location",
                    property: "State Name",
                    level: "district",
                    isState: true,
                    tooltip: {
                        name: "State/UT name"
                    }
                }
            ],
            dimensions: [
                {
                    name: "indicator",
                    property: "Plays per capita ( 1st April 2020)",
                    tooltip: {
                        name: "Learning Sessions per Capita"
                    },
                }
            ],
            filters: [],
            options: {
                legend: {
                    title: 'Learning Sessions on Potential Users'
                }
            }
        }
    },
    totalLearningSessions: {
        barChart: {
            pathToFile: 'diksha_etb_learning-session.json',
            mainFilter: 'State Code',
            defaultLevel: 'State Name',
            columns: [
                {
                    name: "State/UT name",
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

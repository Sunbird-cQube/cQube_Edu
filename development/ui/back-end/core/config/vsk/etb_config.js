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
        loTable: {
            pathToFile: 'vsk_diksha_etb_qr-coverage.json',
            gaugeChart: {
                title: 'Content Coverage on QR',
                aggegration: {
                    type: 'AVG',
                    column: 'Linked QR Count',
                    against: "Resource Count"
                },
                valueSuffix: "%"
            },
            columns: [
                {
                    name: "Subject",
                    property: "Subject"
                },
                {
                    name: "Grade",
                    property: "Grade",
                    transposeColumn: true,
                    aggegration: {
                        type: "SUM",
                        property: "Linked QR Count",
                    },
                    colSortNeeded: true
                }
            ],
            filters: [
                {
                    name: 'Medium',
                    column: 'Medium'
                }
            ]
        },
        gaugeChart: {
            pathToFile: 'diksha_etb_qr-coverage.json',
            options: {
                title: 'Content Coverage on QR',
                valueSuffix: "%"
            },
            dimension: {
                name: "QR covered",
                property: "QR covered",
                aggegration: {
                    type: 'AVG',
                    property: 'QR covered',
                    against: "Total QR Count"
                }
            },
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
            defaultLevel: 'grade_new',
            columns: [
                {
                    name: "Grade",
                    property: "grade_new",
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
                    name: 'Subject',
                    column: 'Subject'
                }
            ]
        }
    }
}

module.exports = dataSourceInfo;

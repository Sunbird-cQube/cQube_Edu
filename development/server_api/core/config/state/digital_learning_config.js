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
            pathToFile: 'vsk_diksha_etb_coverage-status.json',
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
                        nullValueHolder: "NA"
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
            pathToFile: 'diksha_etb_etb-coverage.json',
            mainFilter: 'State Code',
            options: {
                title: 'Overall ETB Coverage',
                valueSuffix: "%"
            },
            dimension: {
                name: "State energised (ETB)",
                property: "State energised (ETB)",
                aggegration: {
                    type: 'AVG',
                    property: 'State energised (ETB)',
                    against: "Total Physical textbooks excluding adopted (Curriculum+Supplementary)"
                }
            },
            filters: [
                {
                    name: 'Medium',
                    column: 'Medium'
                }
            ]
        }
    },
    qrCodeCoverageAcrossStates: {
        loTable: {
            pathToFile: 'vsk_diksha_etb_qr-coverage.json',
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
                        type: "AVG",
                        property: "QR Coverage",
                        nullValueHolder: "NA",
                        valueSuffix: '%'
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
            mainFilter: 'State Code',
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

const dataSourceInfo = [{
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Implementation Status",
    "section_description": "des",
    "report_name": "statesEnergizedTextBooks",
    "report_type": "map",
    "description": "This dashboard provides information about student's performance in the Semester Assessment Test",
    "columns": [{
        "columns_name": "State\/UT name",
        "columns_property": ["State Name", "state name2"],
        "columns_islocationname": "true"
    }],
    "filters": [{
        "filters_name": "medium",
        "filters_columns": "Medium",
        "level": ["district"]

    }],
    "levels": [{
        "level_name": "",
        "level_value": ""
    }]
}, {
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "ETB Coverage Status",
    "section_description": "des",
    "report_name": "qrCodeCoverageAcrossStates",
    "report_type": "bar",
    "description": "This geo-location-based dashboard provides insights on student Periodic Assessment Test (PAT) performance across Uttar Pradesh.",
    "columns": [{
        "columns_name": "State\/UT name",
        "columns_property": "State Name",
        "columns_islocationname": "TRUE"
    }],
    "filters": [{
        "filters_name": "subject",
        "filters_columns": "Subject",
        "filter_xyz": "abf"
    }]
},
{
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "ETB Coverage Status",
    "section_description": "des",
    "report_name": "qrCodeCoverageAcrossStates",
    "report_type": "gauge",
    "description": "This geo-location-based dashboard provides insights on student Periodic Assessment Test (PAT) performance across Uttar Pradesh.",
    "columns": [{
        "columns_name": "State\/UT name",
        "columns_property": "State Name",
        "columns_islocationname": "TRUE"
    }],
    "filters": [{
        "filters_name": "subject",
        "filters_columns": "Subject",
        "filter_xyz": "abf"
    }]
}
    , {
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Content Coverage on QR",
    "section_description": "des",
    "report_name": "map-_repo2",
    "report_type": "map",
    "description": "This dashboard provides insights on student performance at the question level",
    "columns": [{
        "columns_name": "state_code",
        "columns_property": "State Code",
        "columns_islocationname": "TRUE"
    }],
    "filters": [{
        "filters_name": "",
        "filters_columns": "",
        "filter_xyz": ""
    }]
}, {
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Learning Sessions",
    "section_description": "des",
    "report_name": "map-_repo3",
    "report_type": "bar",
    "description": "This dashboard provides insights on student performance at the question level",
    "columns": [{
        "columns_name": "State\/UT name",
        "columns_property": "State Name",
        "columns_islocationname": "TRUE"
    }],
    "filters": [{
        "filters_name": "",
        "filters_columns": "",
        "filter_xyz": ""
    }]
}, {
    "data_source": "Diksha",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Learning Sessions on Potential Users",
    "section_description": "des",
    "report_name": "map-_repo1",
    "report_type": "map",
    "description": "This dashboard provides insights on student performance at the question level.",
    "columns": [{
        "columns_name": "Location",
        "columns_property": "State Name",
        "columns_islocationname": "true"
    }],
    "filters": [{
        "filters_name": "grade",
        "filters_columns": "Grade",
        "filter_xyz": "pqr"
    }]
}, {
    "data_source": "NCF",
    "IMAGE URL": "ETB & E-Content.png",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Progress Status",
    "section_description": "des",
    "report_name": "progressOfNCF",
    "report_type": "map",
    "description": "This dashboard provides insights on student performance at the question level.",
    "pathToFile": 'ncf_all-dashboard.json',
    "overallMetricsOption": false,
    "locations": [
        {
            "name": "Location",
            "property": "State",
            "level": "state",
            "isState": true,
            "tooltip": {
                "name": "State/UT name"
            }
        }
    ],
    "dimensions": [
        {
            "name": "Mobile Survey Completed",
            "property": "Mobile Survey Completed (Target: 3000 per State/ UT)",
            "tooltip": {
                "name": "Mobile Survey Completed",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "DCR to be uploaded",
            "property": "Number of DCR to be uploaded (Target)",
            "tooltip": {
                "name": "DCR to be uploaded",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "DCR Uploaded",
            "property": "DCR Completed/ Uploaded (1498/1568)",
            "tooltip": {
                "name": "DCR Uploaded",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "Paper e-template submitted",
            "property": "State Position Paper e-template submitted",
            "tooltip": {
                "name": "Paper e-template submitted",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "National District Groups created",
            "property": "National District Groups (NDGs) created",
            "tooltip": {
                "name": "National District Groups created",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "National DCR Submitted",
            "property": "National DCR Submitted",
            "tooltip": {
                "name": "National DCR Submitted",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "National DCR Target",
            "property": "National DCR Target",
            "tooltip": {
                "name": "National DCR Target",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "Total SSC Onboarded",
            "property": "Total SSC Onboarded",
            "tooltip": {
                "name": "Total SSC Onboarded",
            },
            "includeAsMetricFilter": true,
        },
        {
            "name": "state_code",
            "property": "State Code"
        }
    ],
    "filters": [],
    "options": {
        "legend": {
            "title": 'NCF Progress'
        }
    },
    "levels": [
        {
            "name": "State",
            "value": "state",
            "property": "State"
        }
    ]
},
{
    "data_source": "PM Poshan",
    "IMAGE URL": "ETB & E-Content.png",
    "IMAGE URL": "ETB & E-Content.png",
    "section_name": "Progress",
    "section_description": "des",
    "report_name": "PM_poshan_access",
    "report_type": "map",
    "description": "This dashboard provides insights on student performance at the question level.",
    pathToFile: 'pm-poshan_access-across-india.json',
    overallMetricsOption: false,
    locations: [
        {
            name: "Location",
            property: "State Name",
            level: "state",
            isState: true,
            tooltip: {
                name: "State/UT name"
            }
        },
        {
            name: "Location",
            property: "District Name",
            level: "district",
            tooltip: {
                name: "District Name"
            }
        }
    ],
    dimensions: [
        {
            name: "Total Enrolled",
            property: "Enrolled In July",
            tooltip: {
                name: "Total Enrolled"
            },
            aggegration: {
                type: "SUM"
            },
            includeAsMetricFilter: true,
        },
        {
            name: "Total Schools",
            property: "Total Schools",
            tooltip: {
                name: "Total Schools"
            },
            aggegration: {
                type: "SUM"
            },
            includeAsMetricFilter: true,
        },
        {
            name: "state_code",
            property: "State Code"
        }
    ],
    filters: [
        {
            name: 'State/UT',
            column: 'State Name',
            optionValueColumn: "State Code",
            level: ["district"],
            hierarchyLevel: 1
        }
    ],
    levels: [
        {
            name: "State",
            value: "state",
            property: "State Name",
            noStateFilter: true
        },
        {
            name: "District",
            value: "district",
            property: "District Name"
        }
    ],
    options: {
        legend: {
            title: 'PM Poshan Access'
        }
    }
}
]


module.exports = dataSourceInfo;

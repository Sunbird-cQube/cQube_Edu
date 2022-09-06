const vanityMetrics = [
    {
        "title": "Nishtha",
        "navigationURL": "/nishtha",
        "metrics": [
            {
                pathToFile: 'dashboard/Nishta metrics.json',
                name: "Total Enrollments",
                aggegration: 'SUM',
                columnName: 'Total Enrollments',
                tooltip: "Total number of enrollments by teachers across all courses"
             },
             {
                 pathToFile: 'dashboard/Nishta metrics.json',
                 name: "Total Certifications",
                 aggegration: 'SUM',
                 columnName: 'Total Certifications',
                 tooltip: "Total number of certifications by teachers across all courses"
              },
              {
                pathToFile: 'dashboard/Nishta metrics.json',
                name: "Total Completion",
                aggegration: 'SUM',
                columnName: 'Total Completion',
                tooltip: "Total number of completion by teachers across all courses"
             }
        ],
        "icon": "NISHTHA.png",
        // "tooltip": "Nishtha"
    },
    {
        "title": "ETB & E-content",
        "navigationURL": "/etb",
        "metrics": [
            {
               pathToFile: 'dashboard/ETB coverage.json',
               name: "Total ETB",
               aggegration: 'SUM',
               columnName: 'Total Energised (Live ETB)'
            },
            {
                pathToFile: 'dashboard/ETB qr.json',
                name: "Total QR Codes",
                aggegration: 'SUM',
                columnName: 'Total QR Count'
             }
        ],
        "icon": "ETB & E-Content.png",
        "tooltip": ""
    },
    {
        "title": "NAS",
        "navigationURL": "/nas",
        "metrics": [
            {
                pathToFile: 'dashboard/Nas metrics.json',
                name: "Total Students Surveyed",
                aggegration: 'SUM',
                columnName: 'Students Surveyed',
                tooltip: "Total number of students assessed in the NAS survey"
             },
            // {
            //     pathToFile: 'dashboard/Nas metrics.json',
            //     name: "Total Schools Surveyed",
            //     aggegration: 'SUM',
            //     columnName: ''
            // }
        ],
        "icon": "NAS.png",
        "tooltip": ""
    },{
        "title": "PGI",
        "navigationURL": "/pgi",
        "metrics": [
            {
                pathToFile: 'dashboard/PGI metrics.json',
                name: "Total Districts Participated",
                aggegration: '',
                columnName: '',
                tooltip: "Total number of districts participated"
             },
        ],
        "icon": "PGI.png",
        "tooltip": "PGI"
    },
    {
        "title": "UDISE",
        "navigationURL": "/udise",
        "metrics": [
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "Pupil Teacher ratio",
                aggegration: 'SUM',
                columnName: 'PTR',
                tooltip: "Average number of Pupil per Teacher"
             },
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "Schools with drinking water",
                aggegration: 'SUM',
                columnName: 'tot_schools_having_drinkingwater',
                tooltip: "Percentage schools surveyed under UDISE with drinking water"
            },
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "Schools with Electricity connection",
                aggegration: 'SUM',
                columnName: 'tot_schools_having_electricity',
                tooltip: "Percentage schools surveyed under UDISE with electricity connection"
            },
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "Schools with Library",
                aggegration: 'SUM',
                columnName: 'tot_schools_having_library',
                tooltip: "Percentage schools surveyed under UDISE with library"
            },
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "CWSN Enrollment",
                aggegration: 'SUM',
                columnName: 'Total Enrollment CWSN',
                tooltip: "Percentage schools surveyed under UDISE with CWSN Enrollment"
            },
            {
                pathToFile: 'dashboard/UDISE metrics.json',
                name: "Schools with ramp",
                aggegration: 'SUM',
                columnName: 'tot_schools_having_ramp',
                tooltip: "Percentage schools surveyed under UDISE with ramp"
            },
        ],
        "icon": "UDISE.png",
        "tooltip": ""
    },
]

module.exports = vanityMetrics;

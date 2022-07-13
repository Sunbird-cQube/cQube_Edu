const vanityMetrics = [
    {
        "title": "Nishtha",
        "navigationURL": "/nishtha",
        "metrics": [
            {
                pathToFile: 'dashboard/Nishta metrics.json',
                name: "Total Enrollments",
                aggegration: 'SUM',
                columnName: 'Total Enrollments'
             },
             {
                 pathToFile: 'dashboard/Nishta metrics.json',
                 name: "Total Certifications",
                 aggegration: 'SUM',
                 columnName: 'Total Certifications'
              },
              {
                pathToFile: 'dashboard/Nishta metrics.json',
                name: "Total Completion",
                aggegration: 'SUM',
                columnName: 'Total Completion'
             }
        ],
        "icon": "NISHTHA.png",
        "tooltip": "Nishtha"
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
                columnName: 'Students Surveyed'
             },
            {
                pathToFile: 'dashboard/Nas metrics.json',
                name: "Total Schools Surveyed",
                aggegration: 'SUM',
                columnName: ''
            }
        ],
        "icon": "NAS.png",
        "tooltip": ""
    },
]

module.exports = vanityMetrics;

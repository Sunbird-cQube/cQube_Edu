const metrics = [
    {
        "title": "NISHTHA",
        "navigationURL": "/nishtha",
        "metrics": [
            
        ],
        "icon": "NISHTHA.png",
        "tooltip": "Nishtha"
    },
    {
        "title": "DIKSHA",
        "navigationURL": "/etb",
        "metrics": [
            {
                pathToFile: 'dashboard/Total ETB.json',
                name: "Total ETB",
                aggegration: 'SUM',
                columnName: 'Total ETB'
             },
             {
                 pathToFile: 'dashboard/Total Contents.json',
                 name: "Total Contents",
                 aggegration: 'SUM',
                 columnName: 'Total Contents'
              }
        ],
        "icon": "CWSN.png",
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
    {
        "title": "UDISE",
        "navigationURL": "/udise",
        "metrics": [
            {
                pathToFile: 'dashboard/Total Teachers.json',
                name: "Total Teachers",
                aggegration: 'SUM',
                columnName: 'Total Teachers'
             },
            {
                pathToFile: 'dashboard/Total students.json',
                name: "Total students",
                aggegration: 'SUM',
                columnName: 'Total Students'
            }
        ],
        "icon": "UDISE.png",
        "tooltip": ""
    },
    {
        "title": "PGI",
        "navigationURL": "/pgi",
        "metrics": [
            {
                pathToFile: 'dashboard/PGI metrics.json',
                name: "Net PGI Score",
                aggegration: 'SUM',
                columnName: 'Grand Total'
             },
        ],
        "icon": "PGI.png",  
        "tooltip": ""
    },
    {
        "title": "POSHAN",
        "navigationURL": "/poshan",
        "metrics": [
            {
                pathToFile: 'dashboard/PM Poshan metrics.json',
                name: "Total Schools",
                aggegration: 'SUM',
                columnName: 'Total Schools'
             },
            {
                pathToFile: 'dashboard/PM Poshan metrics.json',
                name: "Total Meals Served",
                aggegration: 'SUM',
                columnName: 'MealServed(02/July/2022)'
            }
        ],
        "icon": "Adults Education.png",
        "tooltip": ""
    }
]

module.exports = metrics;

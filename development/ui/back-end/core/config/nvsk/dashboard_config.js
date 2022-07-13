const metrics = [
    {
        "title": "Nishtha",
        "navigationURL": "/nishtha",
        "metrics": [
            
        ],
        "icon": "NISHTHA.png",
        "tooltip": "Nishtha"
    },
    {
        "title": "ETB & E-content",
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
        "icon": "ETB & E-Content.png",
        "tooltip": ""
    },
    {
        "title": "NIPUN BHARAT",
        "navigationURL": "/nipunbharath",
        "metrics": [
            {
                pathToFile: 'dashboard/Total Contents Linked.json',
                name: "Total Contents Linked",
                aggegration: 'SUM',
                columnName: 'Content Count'
             },
            {
                pathToFile: 'dashboard/Total Lo.json',
                name: "Total LO",
                aggegration: '',
                columnName: ''
            }
        ],
        "icon": "NIPUN BHARAT.png",
        "tooltip": ""
    },
    {
        "title": "Quizzes",
        "navigationURL": "/quizzes",
        "metrics": [
            {
                pathToFile: 'dashboard/Bhasha Sangam Enrolment.json',
                name: "Total Enrolment",
                aggegration: 'SUM',
                columnName: 'Total'
            }
        ],
        "icon": "Quizzes.png",
        "tooltip": ""
    },
    {
        "title": "NAS",
        "navigationURL": "/nas",
        "metrics": [
            
        ],
        "icon": "NAS.png",
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
        "tooltip": "PGI"
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
        "title": "PM Poshan",
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
            },
        ],
        "icon": "Adults Education.png",
        "tooltip": ""
    },
    {
        "title": "NCF",
        "navigationURL": "",
        "metrics": [
            
        ],
        "icon": "NCF.png",
        "tooltip": ""
    },
    {
        "title": "Vidyanjali",
        "navigationURL": "/vidyanjali",
        "metrics": [
            
        ],
        "icon": "Vidyanjali.jpg",
        "tooltip": ""
    },
    {
        "title": "Micro-Improvement Program",
        "navigationURL": "/microimprovement",
        "metrics": [],
        "icon": "Adults Education.png",
        "tooltip": ""
    },
    {
        "title": "National ICT Award for Teachers",
        "navigationURL": "",
        "metrics": [
            
        ],
        "icon": "NISHTHA.png",
        "tooltip": ""
    },
    {
        "title": "National Award to Teachers",
        "navigationURL": "",
        "metrics": [
            
        ],
        "icon": "Adults Education.png",
        "tooltip": ""
    },
    {
        "title": "PM Shri",
        "navigationURL": "",
        "metrics": [
            
        ],
        "icon": "Adults Education.png",
        "tooltip": ""
    },
    {
        "title": "PM eVidya and Radio Channels",
        "navigationURL": "",
        "metrics": [
            
        ],
        "icon": "NISHTHA.png",
        "tooltip": ""
    }
]

module.exports = metrics;

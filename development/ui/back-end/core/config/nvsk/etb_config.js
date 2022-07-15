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
    }
}

module.exports = dataSourceInfo;

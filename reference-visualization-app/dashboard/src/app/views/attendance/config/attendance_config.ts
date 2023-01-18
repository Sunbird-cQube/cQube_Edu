export const config = {
  student_attendance_complaince: {
    "queries": {
      "table": "select min(date) as min_date, max(date) as max_date, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id group by t1.state_id, state_name",
      "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state",
      "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where date between {startDate} and {endDate}"
    },
    "timeSeriesQueries": {
      "table": "select state_name, avg(percentage) as percentage from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id where date between {startDate} and {endDate} group by t1.state_id, state_name",
      "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where date between {startDate} and {endDate}",
      "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where date between {startDate} and {endDate}"
    },
    "defaultLevel": "state",
    "filters": [
      {
        "name": "State",
        "labelProp": "state_name",
        "valueProp": "state_id",
        "query": "select t1.state_id, state_name from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id group by t1.state_id,state_name",
        "timeSeriesQueries": {
          "table": "select district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where (date between {startDate} and {endDate}) and state_id={state_id} group by t1.district_id,district_name, state_name",
          "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where state_id = {state_id} and date between {startDate} and {endDate}",
          "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where state_id = {state_id} and date between {startDate} and {endDate}"
        },
        "actions": {
          "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where state_id={state_id} group by t1.district_id,district_name, state_name",
            "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where state_id = {state_id}",
            "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_state where state_id = {state_id} and date between {startDate} and {endDate}"
          },
          "level": "district"
        }
      },
      {
        "name": "District",
        "labelProp": "district_name",
        "valueProp": "district_id",
        "timeSeriesQueries": {
          "table": "select block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where (date between {startDate} and {endDate}) and district_id={district_id} group by t1.block_id,block_name,district_name, state_name",
          "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_district where district_id = {district_id} and date between {startDate} and {endDate}",
          "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_district where district_id = {district_id} and date between {startDate} and {endDate}"
        },
        "query": "select t1.district_id, district_name from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where state_id={state_id} group by t1.district_id,district_name",
        "actions": {
          "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where district_id={district_id} group by t1.block_id,block_name,district_name, state_name",
            "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_district where district_id = {district_id}",
            "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_district where district_id = {district_id} and date between {startDate} and {endDate}"
          },
          "level": "block"
        }
      },
      {
        "name": "Block",
        "labelProp": "block_name",
        "valueProp": "block_id",
        "timeSeriesQueries": {
          "table": "select cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id = t2.cluster_id where (date between {startDate} and {endDate}) and block_id={block_id} group by t1.cluster_id,cluster_name,block_name,district_name, state_name",
          "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_block where block_id = {block_id} and date between {startDate} and {endDate}",
          "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_block where block_id = {block_id} and date between {startDate} and {endDate}"
        },
        "query": "select t1.block_id, block_name from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where district_id={district_id} group by t1.block_id,block_name",
        "actions": {
          "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id = t2.cluster_id where block_id={block_id} group by t1.cluster_id,cluster_name,block_name,district_name, state_name",
            "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_block where block_id = {block_id}",
            "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_block where block_id = {block_id} and date between {startDate} and {endDate}"
          },
          "level": "cluster"
        }
      },
      {
        "name": "Cluster",
        "labelProp": "cluster_name",
        "valueProp": "cluster_id",
        "timeSeriesQueries": {
          "table": "select school_name, cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_school as t1 left join ingestion.student_attendance as t2 on t1.school_id = t2.school_id where (date between {startDate} and {endDate}) and cluster_id={cluster_id} group by t1.school_id,school_name,cluster_name,block_name,district_name, state_name",
          "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_cluster where cluster_id = {cluster_id} and date between {startDate} and {endDate}",
          "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_cluster where cluster_id = {cluster_id} and date between {startDate} and {endDate}",
        },
        "query": "select t1.cluster_id, cluster_name from ingestion.student_attendance_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id = t2.cluster_id where block_id={block_id} group by t1.cluster_id,cluster_name",
        "actions": {
          "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, school_name, cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_school as t1 left join ingestion.student_attendance as t2 on t1.school_id = t2.school_id where cluster_id={cluster_id} group by t1.school_id,school_name,cluster_name,block_name,district_name, state_name",
            "bigNumber": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_cluster where cluster_id = {cluster_id}",
            "bigNumberComparison": "select round(avg((sum/count)* 100.00),2) as percentage from ingestion.student_attendance_marked_above_50_percent_by_cluster where cluster_id = {cluster_id} and date between {startDate} and {endDate}",
          },
          "level": "school"
        }
      },
      {
        "name": "School",
        "labelProp": "school_name",
        "valueProp": "school_id",
        "timeSeriesQueries": {
          "table": "select grade, school_name, cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_class as t1 left join ingestion.student_attendance as t2 on t1.school_id = t2.school_id where (date between {startDate} and {endDate}) and t1.school_id={school_id} group by grade,school_name,cluster_name,block_name,district_name, state_name",
        },
        "query": "select t1.school_id, school_name from ingestion.student_attendance_by_school as t1 left join ingestion.student_attendance as t2 on t1.school_id = t2.school_id where cluster_id={cluster_id} group by t1.school_id,school_name",
        "actions": {
          "queries": {
            "table": "select min(date) as min_date, max(date) as max_date, grade, school_name, cluster_name, block_name, district_name, state_name, avg(percentage) as percentage from ingestion.student_attendance_by_class as t1 left join ingestion.student_attendance as t2 on t1.school_id = t2.school_id where t1.school_id={school_id} group by grade,school_name,cluster_name,block_name,district_name, state_name"
          },
          "level": "grade"
        }
      }
    ],
    "options": {
      "table": {
        "columns": [
          {
            name: "State",
            property: "state_name",
            sticky: true,
            class: "text-center"
          },
          {
            name: "District",
            property: "district_name",
            sticky: true,
            class: "text-center"
          },
          {
            name: "Block",
            property: "block_name",
            sticky: true,
            class: "text-center"
          },
          {
            name: "Cluster",
            property: "cluster_name",
            sticky: true,
            class: "text-center"
          },
          {
            name: "School",
            property: "school_name",
            sticky: true,
            class: "text-center"
          },
          {
            name: "Grade",
            property: "grade",
            sticky: true,
            class: "text-center"
          },
          {
            name: "Student Attendance Complaince",
            property: "percentage",
            sticky: true,
            class: "text-center",
            isHeatMapRequired: true,
            color: {
              type: "percentage",
              values: [
                {
                  color: "#00FF00",
                  breakPoint: 56
                },
                {
                  color: "#FFFF00",
                  breakPoint: 50
                },
                {
                  color: "#FF0000",
                  breakPoint: 0
                }
              ]
            },
          }
        ],
        "sortByProperty": "state_name",
        "sortDirection": "desc"
      },
      "bigNumber": {
        "valueSuffix": '%'
      }
    }
  },
  student_attendance_map: {
    "queries": {
      "map": "select min(date) as min_date, max(date) as max_date, {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_{level} as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id group by t1.{level}_id, {level}_name, {level}_lat, {level}_long"
    },
    "timeSeriesQueries": {
      "map": "select {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_{level} as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id where date between {startDate} and {endDate} group by t1.{level}_id, {level}_name, {level}_lat, {level}_long",
    },
    "defaultLevel": "district",
    "filters": [
      {
        "name": "District",
        "hierarchyLevel": "2",
        "labelProp": "district_name",
        "valueProp": "district_id",
        "query": "select district_name, district_id from ingestion.dimensions group by district_id, district_name",
        "timeSeriesQueries": {
          "map": "select {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_{level} as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id where district_id = {district_id} and date between {startDate} and {endDate} group by t1.{level}_id, {level}_name, {level}_lat, {level}_long",
        },
        "actions": {
          "queries": {
            "map": "select min(date) as min_date, max(date) as max_date, {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_{level} as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id where district_id = {district_id} group by t1.{level}_id, {level}_name, {level}_lat, {level}_long"
          },
          "level": "block"
        }
      },
      {
        "name": "Block",
        "hierarchyLevel": "3",
        "labelProp": "block_name",
        "valueProp": "block_id",
        "query": "select block_name, block_id from ingestion.dimensions where district_id = {district_id} group by block_id, block_name",
        "timeSeriesQueries": {
          "map": "select {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_cluster as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id where block_id = {block_id} and date between {startDate} and {endDate} group by t1.{level}_id, {level}_name, {level}_lat, {level}_long",
        },
        "actions": {
          "queries": {
            "map": "select min(date) as min_date, max(date) as max_date, {level}_name, t1.{level}_id, avg(percentage) as percentage, avg(count) as count, avg(sum) as sum, {level}_lat as latitude, {level}_long as longitude from ingestion.student_attendance_by_{level} as t1 left join ingestion.dimensions as t2 on t1.{level}_id = t2.{level}_id where block_id = {block_id} group by t1.{level}_id, {level}_name, {level}_lat, {level}_long"
          },
          "level": "cluster"
        }
      },
      {
        "name": "Cluster",
        "hierarchyLevel": "4",
        "labelProp": "cluster_name",
        "valueProp": "cluster_id",
        "query": "select cluster_name, cluster_id from ingestion.dimensions where block_id = {block_id} group by cluster_id, cluster_name",
        "timeSeriesQueries": {
        },
        "actions": {
          "queries": {
          },
          "level": "school"
        }
      }
    ],
    "levels": [
      {
        "hierarchyLevel": "2",
        "name": "District",
        "value": "district",
        "actions": {
          "drilldown": [
          ]
        }
      },
      {
        "hierarchyLevel": "3",
        "name": "Blocks",
        "value": "block",
        "actions": {
          "drilldown": [
            "district_name", "district_id"
          ]
        }
      },
      {
        "hierarchyLevel": "4",
        "name": "Clusters",
        "value": "cluster",
        "actions": {
          "drilldown": [
            "district_name", "district_id", "block_name", "block_id"
          ]
        }
      }
    ],
    "options": {
      "chart": {
        "type": "map",
        "title": "Student Attendance"
      },
      "map": {
        "metricFilterNeeded": true,
        "metrics": [
          {
            "label": "Average Percentage",
            "value": "percentage"
          },
          {
            "label": "Sum Of Students",
            "value": "sum"
          },
          {
            "label": "Count of Schools",
            "value": "count"
          }
        ],
        "indicator": "percentage",
        "indicatorType": "percent",
        "legend": {
          "title": "Student Attendance"
        },
        "tooltipMetrics": [
          {
            "valuePrefix": "Average Percentage is ",
            "value": "percentage",
            "valueSuffix": "\n"
          },
          {
            "valuePrefix": "Total Schools are ",
            "value": "count",
            "valueSuffix": "\n"
          },
          {
            "valuePrefix": "District: ",
            "value": "district_name",
            "valueSuffix": "\n"
          },
          {
            "valuePrefix": "Block: ",
            "value": "block_name",
            "valueSuffix": "\n"
          },
          {
            "valuePrefix": "Cluster: ",
            "value": "cluster_name",
            "valueSuffix": "\n"
          }
        ]
      }
    }
  },
  student_attendance_bar: {
    "queries": {
      "barChart": "select min(date) as min_date, max(date) as max_date, state_name as location, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id group by t1.state_id, state_name",
    },
    "timeSeriesQueries": {
      "barChart": "select state_name as location, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id where date between {startDate} and {endDate} group by t1.state_id, state_name",
    },
    "defaultLevel": "state",
    "filters": [
      {
        "name": "State",
        "labelProp": "state_name",
        "valueProp": "state_id",
        "query": "select t1.state_id, state_name from ingestion.student_attendance_by_state as t1 left join ingestion.student_attendance as t2 on t1.state_id = t2.state_id group by t1.state_id,state_name",
        "timeSeriesQueries": {
          "barChart": "select district_name as location, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where (date between {startDate} and {endDate}) and state_id={state_id} group by t1.district_id,district_name, state_name",
        },
        "actions": {
          "queries": {
            "barChart": "select min(date) as min_date, max(date) as max_date, district_name as location, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where state_id={state_id} group by t1.district_id,district_name, state_name",
          },
          "level": "district"
        }
      },
      {
        "name": "District",
        "labelProp": "district_name",
        "valueProp": "district_id",
        "timeSeriesQueries": {
          "barChart": "select block_name as location, district_name, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where (date between {startDate} and {endDate}) and district_id={district_id} group by t1.block_id,block_name,district_name, state_name",
        },
        "query": "select t1.district_id, district_name from ingestion.student_attendance_by_district as t1 left join ingestion.student_attendance as t2 on t1.district_id = t2.district_id where state_id={state_id} group by t1.district_id,district_name",
        "actions": {
          "queries": {
            "barChart": "select min(date) as min_date, max(date) as max_date, block_name as location, district_name, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where district_id={district_id} group by t1.block_id,block_name,district_name, state_name",
          },
          "level": "block"
        }
      },
      {
        "name": "Block",
        "labelProp": "block_name",
        "valueProp": "block_id",
        "timeSeriesQueries": {
          "barChart": "select cluster_name as location, block_name, district_name, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id = t2.cluster_id where (date between {startDate} and {endDate}) and block_id={block_id} group by t1.cluster_id,cluster_name,block_name,district_name, state_name",
        },
        "query": "select t1.block_id, block_name from ingestion.student_attendance_by_block as t1 left join ingestion.student_attendance as t2 on t1.block_id = t2.block_id where district_id={district_id} group by t1.block_id,block_name",
        "actions": {
          "queries": {
            "barChart": "select min(date) as min_date, max(date) as max_date, cluster_name as location, block_name, district_name, state_name, avg(percentage) as percentage, min(count) as count from ingestion.student_attendance_by_cluster as t1 left join ingestion.student_attendance as t2 on t1.cluster_id = t2.cluster_id where block_id={block_id} group by t1.cluster_id,cluster_name,block_name,district_name, state_name",
          },
          "level": "cluster"
        }
      }
    ],
    "options": {
      "barChart": {
        "yAxis": {
          "title": "level",
          "label": "location",
          "value": "location"
        },
        "xAxis": {
          "title": "Number",
          "metrics": [
            {
              "label": "Average Percentage",
              "value": "percentage"
            },
            {
              "label": "Count of Students",
              "value": "count"
            }
          ]
        }
      }
    }
  }
}
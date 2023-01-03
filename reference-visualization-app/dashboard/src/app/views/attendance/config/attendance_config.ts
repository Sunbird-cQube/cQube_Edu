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
    "levels": [
      {
        "name": "Blocks",
        "value": "block",
        "query": "Select * from table_name"
      },
      {
        "name": "Clusters",
        "value": "cluster",
        "query": "Select * from table_name"
      }
    ],
    "options": {
      "chart": {
        "type": "table",
        "title": "Student Attendance"
      },
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
            color: '#002966',
          }
        ],
        "sortByProperty": "location",
        "sortDirection": "asc"
      },
      "bigNumber": {
        "valueSuffix": '%'
      },
      "tooltip": "District ID: {district_id}\nDistrict Name: {district_name}\nAttendance: {attendancec}",
    }
  },
  student_attendance_map: {
    "query": "select * from ingestion.student_attendance_by_district",
    "filters": [],
    "levels": [],
    "options": {
      "chart": {
        "type": "map",
        "title": "Student Attendance"
      },
      "map": {
        "indicator": "attendance",
        "indicatorType": "percent",
        "legend": {
          "title": "Student Attendance"
        },
        "latitude": "latitude",
        "longitude": "longitude"
      },
      "tooltip": "District ID: {district_code}\nDistrict Name: {district_name}\nAttendance: {attendance}"
    }
  }
}
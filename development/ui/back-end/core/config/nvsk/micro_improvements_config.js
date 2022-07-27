const dataSourceInfo = {
  micro_improvements: {
    map: {
      pathToFile: "micro-improvement_all-dashboard.json",
      overallMetricsOption: false,
      locations: [
        {
          name: "Location",
          property: "State",
          level: "state",
          isState: true,
          tooltip: {
            name: "State/UT name",
          }
        },
      ],
      dimensions: [
        {
          name: "Total Micro Improvements",
          property: "Total Micro Improvements Projects",
          tooltip: {
            name: "Total Projects",
          },
          includeAsMetricFilter: true
        },
        {
          name: "Micro Improvements Started",
          property: "Total Micro Improvements Started",
          tooltip: {
            name: "Program Started",
          },
          includeAsMetricFilter: true
        },
        {
          name: "Micro Improvements In progress",
          property: "Total Micro Improvements In progress",
          tooltip: {
            name: "Program In progress",
          },
          includeAsMetricFilter: true
        },
        {
          name: "Micro Improvements Submitted",
          property: "Total Micro improvement submitted",
          tooltip: {
            name: "Program Submitted",
          },
          includeAsMetricFilter: true
        },
        {
          name: "Micro Improvements Submitted with Evidence",
          property: "Total Micro improvement submitted with evidence",
          tooltip: {
            name: "Program Submitted with Evidence",
          },
          includeAsMetricFilter: true
        },
        {
          name: "state_code",
          property: "State Code",
        },
      ],
      filters: [],
      options: {
        legend: {
          title: "Micro-improvements ",
        },
      },
    },
  },
  micro_improvements_program: {
    map: {
      pathToFile: "micro-improvement_all-dashboard.json",
      locations: [
        {
          name: "Location",
          property: "State",
          level: "state",
          isState: true,
          tooltip: {
            name: "State/UT name",
          },
        },
      ],
      dimensions: [
        {
          name: "indicator",
          property: "Started Micro-Improvement",
          tooltip: {
            name: "Participating in Micro-Improvement Program",
          },
        },
        {
          name: "state_code",
          property: "State Code",
        },
      ],
      filters: [],
      options: {
        legend: {
          title: "Started doing Micro-Improvement",
        },
      },
    },
  },
};

module.exports = dataSourceInfo;

const dataSourceInfo = {
  micro_improvements: {
    map: {
      pathToFile: "micro_improvements/micro-improvement_all-dashboard.json",
      overallMetricsOption: false,
      locations: [
        {
          name: "Location",
          property: "State",
          level: "state",
          isState: true,
          tooltip: {
            name: "State Name",
          },
        },
      ],
      dimensions: [
        {
          name: "Total Projects",
          property: "Total Micro Improvements Projects",
          tooltip: {
            name: "Total Projects",
          },
          includeAsMetricFilter: true,
        },
        {
          name: "Program Started",
          property: "Total Micro Improvements Started",
          tooltip: {
            name: "Program Started",
          },
          includeAsMetricFilter: true,
        },
        {
          name: "Program In progress",
          property: "Total Micro Improvements In progress",
          tooltip: {
            name: "Program In progress",
          },
          includeAsMetricFilter: true,
        },
        {
          name: "Program Submitted",
          property: "Total Micro improvement submitted",
          tooltip: {
            name: "Program Submitted",
          },
          includeAsMetricFilter: true,
        },
        {
          name: "Programs Submitted with Evidence",
          property: "Total Micro improvement submitted with evidence",
          tooltip: {
            name: "Program Submitted with Evidence",
          },
          includeAsMetricFilter: true,
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
      pathToFile: "micro_improvements/micro-improvement_all-dashboard.json",
      locations: [
        {
          name: "Location",
          property: "State",
          level: "state",
          isState: true,
          tooltip: {
            name: "State Name",
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

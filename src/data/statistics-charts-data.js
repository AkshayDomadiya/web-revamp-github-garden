import { chartsConfig } from "@/configs";

const leaveTypeChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Leaves",
      data: [10, 15, 5, 20], // Customize these values
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#7b1fa2",
    plotOptions: {
      bar: {
        columnWidth: "20%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Sick", "Casual", "Maternity", "Earned"], // Leave types
    },
  },
};

export const statisticsChartsData = [
  {
    color: "white",
    title: "Leave Type Overview",
    description: "Overview of all leave categories",
    footer: "updated just now",
    chart: leaveTypeChart,
  },
];


export default statisticsChartsData;

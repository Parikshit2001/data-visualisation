"use client";
import { Line } from "react-chartjs-2";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Data } from "@/schemas/schemas";
import { getLineChartData } from "@/components/utils/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function LineChart({
  analyticsData,
  featureIndex,
}: {
  analyticsData: Data[];
  featureIndex: number;
}) {
  // const mergedData =
  const { uniqueDates, data: lineChartData } = getLineChartData(
    analyticsData,
    featureIndex
  );
  console.log({ uniqueDates, lineChartData });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: "Time Series Data",
        data: lineChartData,
        fill: false,
        borderColor: "orange",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="w-full md:w-[40vw]">
      <Line options={options} data={data} />
    </div>
  );
}

export default LineChart;

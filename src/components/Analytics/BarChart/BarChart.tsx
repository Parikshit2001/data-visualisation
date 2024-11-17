"use client";
import { getBarChartData } from "@/components/utils/utils";
import { Data } from "@/schemas/schemas";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartEvent, ActiveElement } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart({
  analyticsData,
  featureIndex,
  setFeatureIndex,
}: {
  analyticsData: Data[];
  featureIndex: number;
  setFeatureIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  const barChartData = getBarChartData(analyticsData);

  const data = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Usage",
        data: barChartData,
        // @ts-expect-error context type is not inferred correctly
        backgroundColor: (context) => {
          // Change color based on the highlighted index
          return context.dataIndex === featureIndex
            ? "orange"
            : "rgb(75, 192, 192)"; // Highlight in red
        },
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    indexAxis: "y", // This makes the bar chart horizontal
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Horizontal Bar Chart Example",
      },
    },
    onClick(event: ChartEvent, element: ActiveElement[]) {
      if (element.length > 0) {
        const index = element[0].index; // Get the index of the clicked bar
        setFeatureIndex(index); // Update the highlighted index
      }
    },
  };
  return (
    <div className="w-full md:w-[50vw]">
      <Bar options={options} data={data} />
    </div>
  );
}

export default BarChart;

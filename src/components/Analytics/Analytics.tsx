"use client";
import React, { useEffect, useState } from "react";
import BarChart from "./BarChart/BarChart";
import LineChart from "./LineChart/LineChart";
import Filter from "./Filter";
import axios from "axios";
import { URL } from "@/constants/constants";
import { Data } from "@/schemas/schemas";

function Analytics() {
  const [analytisData, setAnalyticsData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(false);
  const [featureIndex, setFeatureIndex] = useState<number>(0);

  const onFilterApply = async (
    startDate: string,
    endDate: string,
    ageGroup: string,
    gender: string
  ) => {
    setLoading(true);
    const data = await axios.get(
      `${URL}/api/data/features?startDate=${startDate}&endDate=${endDate}&ageGroup=${ageGroup}&gender=${gender}`
    );
    setAnalyticsData(data.data);
    setLoading(false);
  };

  useEffect(() => {
    onFilterApply(
      "2022-10-03T18:30:00.000Z",
      "2022-10-30T18:30:00.000Z",
      "All",
      "Male"
    );
  }, []);

  return (
    <div>
      {loading ? (
        <div className="h-[50vh]">Loading...</div>
      ) : (
        <div className="flex px-20 pb-20 pt-10 space-x-20 bg-white">
          <BarChart
            featureIndex={featureIndex}
            setFeatureIndex={setFeatureIndex}
            analyticsData={analytisData}
          />
          <LineChart featureIndex={featureIndex} analyticsData={analytisData} />
        </div>
      )}
      <Filter loading={loading} onFilterApply={onFilterApply} />
    </div>
  );
}

export default Analytics;

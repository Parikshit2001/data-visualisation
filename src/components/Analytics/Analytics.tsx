"use client";
import React, { Suspense, useState } from "react";
import BarChart from "./BarChart/BarChart";
import LineChart from "./LineChart/LineChart";
import Filter from "./Filter/Filter";
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

  return (
    <div>
      {loading ? (
        <div className="h-[50vh]">Loading...</div>
      ) : (
        <div className="flex flex-col md:flex-row  px-20 pb-20 pt-10 md:space-x-5 space-y-10 md:space-y-0 bg-white">
          <BarChart
            featureIndex={featureIndex}
            setFeatureIndex={setFeatureIndex}
            analyticsData={analytisData}
          />
          <LineChart featureIndex={featureIndex} analyticsData={analytisData} />
        </div>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <Filter loading={loading} onFilterApply={onFilterApply} />
      </Suspense>
    </div>
  );
}

export default Analytics;

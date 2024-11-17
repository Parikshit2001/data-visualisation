"use client";
import React, { Suspense, useState } from "react";
import BarChart from "./BarChart/BarChart";
import LineChart from "./LineChart/LineChart";
import Filter from "./Filter/Filter";
import axios from "axios";
import { URL } from "@/constants/constants";
import { Data } from "@/schemas/schemas";
import Cookies from "js-cookie";
import { signIn, signOut, useSession } from "next-auth/react";

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
    Cookies.set("startDate", startDate, { expires: 7 });
    Cookies.set("endDate", endDate, { expires: 7 });
    Cookies.set("gender", gender, { expires: 7 });
    Cookies.set("ageGroup", ageGroup, { expires: 7 });
  };

  const session = useSession();

  if (session.status === "loading") {
    return (
      <div className="h-screen items-center bg-blue-100 w-full flex flex-col justify-center">
        Loading...
      </div>
    );
  }

  if (session.status === "unauthenticated") {
    return (
      <div className="h-screen bg-blue-100 w-full flex flex-col items-center justify-center">
        <button
          className="bg-blue-500 text-white px-2 py-0.5 rounded"
          onClick={() => signIn()}
        >
          SignIn
        </button>
      </div>
    );
  }

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
      <button
        onClick={() => {
          signOut();
          Cookies.remove("startDate");
          Cookies.remove("endDate");
          Cookies.remove("gender");
          Cookies.remove("ageGroup");
        }}
        className="bg-red-500 text-white px-2 py-0.5 rounded mt-5 ml-2"
      >
        Logout
      </button>
    </div>
  );
}

export default Analytics;

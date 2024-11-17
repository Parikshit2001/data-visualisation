"use client";
import { AgeGroup, Gender } from "@/schemas/schemas";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useFilter = () => {
  const searchParams = useSearchParams();

  // Initialize state with cookies or searchParams as fallback
  const [startDate, setStartDate] = useState<Date>(
    new Date(Cookies.get("startDate") || searchParams.get("startDate") || "2022-10-04")
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(Cookies.get("endDate") || searchParams.get("endDate") || "2022-10-29")
  );
  const [gender, setGender] = useState<Gender>(
    (Cookies.get("gender") as Gender) || (searchParams.get("gender") as Gender) || "All"
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(
    (Cookies.get("ageGroup") as AgeGroup) ||
      (searchParams.get("ageGroup") as AgeGroup) ||
      "All"
  );

  // Save preferences to cookies when state changes
  useEffect(() => {
    Cookies.set("startDate", startDate.toISOString(), { expires: 7 }); // Expires in 7 days
    Cookies.set("endDate", endDate.toISOString(), { expires: 7 });
    Cookies.set("gender", gender, { expires: 7 });
    Cookies.set("ageGroup", ageGroup, { expires: 7 });
  }, [startDate, endDate, gender, ageGroup]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    gender,
    setGender,
    ageGroup,
    setAgeGroup,
  };
};

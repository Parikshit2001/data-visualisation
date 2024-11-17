"use client";
import { AgeGroup, Gender } from "@/schemas/schemas";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const useFilter = () => {
  const searchParams = useSearchParams();

  const [startDate, setStartDate] = useState<Date>(
    new Date(searchParams.get("startDate") || "2022-10-04")
  );
  const [endDate, setEndDate] = useState<Date>(
    new Date(searchParams.get("endDate") || "2022-10-29")
  );
  const [gender, setGender] = useState<Gender>(
    (searchParams.get("gender") as Gender) || "All"
  );
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(
    (searchParams.get("ageGroup") as AgeGroup) || "All"
  );

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

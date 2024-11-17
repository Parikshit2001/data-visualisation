"use client";
import { useState } from "react";

export const useFilter = () => {
  const [startDate, setStartDate] = useState<Date>(new Date(2022, 9, 4));
  const [endDate, setEndDate] = useState<Date>(new Date(2022, 9, 29));
  const [gender, setGender] = useState<"Male" | "Female" | "All">("All");
  const [ageGroup, setAgeGroup] = useState<"15-25" | ">25" | "All">("All");
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

"use client";
import { useFilter } from "@/hooks/useFilter";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CopyURL from "./CopyURL";
import { useEffect } from "react";

const DATE_FORMAT = "dd/MM/yyyy";

function Filter({
  onFilterApply,
  loading,
}: {
  onFilterApply: (
    startDate: string,
    endDate: string,
    ageGroup: string,
    gender: string
  ) => void;
  loading: boolean;
}) {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    ageGroup,
    setAgeGroup,
    gender,
    setGender,
  } = useFilter();

  useEffect(() => {
    onFilterApply(
      startDate.toISOString(),
      endDate.toISOString(),
      ageGroup,
      gender
    );
  }, []);

  return (
    <div className="flex flex-col space-y-9 pl-2">
      <div className="space-y-1">
        <div className="flex gap-2 space-x-3">
          <p>Start Date: </p>
          <DatePicker
            className="border rounded w-24"
            selected={startDate}
            onChange={(date) => {
              if (date) setStartDate(date);
            }}
            dateFormat={DATE_FORMAT}
            minDate={new Date(2022, 9, 4)}
            maxDate={new Date(2022, 9, 29)}
          />
        </div>
        <div className="flex gap-3.5 space-x-3">
          <p>End Date: </p>
          <DatePicker
            className="border rounded w-24"
            selected={endDate}
            onChange={(date) => {
              if (date) setEndDate(date);
            }}
            dateFormat={DATE_FORMAT}
            minDate={new Date(2022, 9, 4)}
            maxDate={new Date(2022, 9, 29)}
          />
        </div>
        <div className="flex gap-3.5">
          <p>Age Group: </p>
          <select
            className="border rounded"
            value={ageGroup}
            // @ts-expect-error: Type of e.target.value is not correctly inferred
            onChange={(e) => setAgeGroup(e.target.value)}
          >
            <option value="All">All</option>
            <option value="15-25">15-25</option>
            <option value=">25">&gt;25</option>
          </select>
        </div>
        <div className="flex gap-3.5 space-x-6">
          <p>Gender: </p>
          <select
            className="border rounded"
            value={gender}
            // @ts-expect-error: Type of e.target.value is not correctly inferred
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
      </div>
      <div>
        <button
          disabled={loading}
          onClick={() => {
            onFilterApply(
              startDate.toISOString(),
              endDate.toISOString(),
              ageGroup,
              gender
            );
          }}
          className={` px-2 py-0.5 rounded-lg text-white ${
            loading ? "bg-gray-500" : "bg-blue-500"
          }`}
        >
          Apply Filter
        </button>
      </div>
      <div>
        <CopyURL
          startDate={startDate.toISOString()}
          endDate={endDate.toISOString()}
          ageGroup={ageGroup}
          gender={gender}
        />
      </div>
    </div>
  );
}

export default Filter;

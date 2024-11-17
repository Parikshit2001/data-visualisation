import { Data } from "@/schemas/schemas";

export const getBarChartData = (analyticsData: Data[]) => {
  const sumA = analyticsData.reduce((sum, data) => sum + data.A, 0);
  const sumB = analyticsData.reduce((sum, data) => sum + data.B, 0);
  const sumC = analyticsData.reduce((sum, data) => sum + data.C, 0);
  const sumD = analyticsData.reduce((sum, data) => sum + data.D, 0);
  const sumE = analyticsData.reduce((sum, data) => sum + data.E, 0);
  const sumF = analyticsData.reduce((sum, data) => sum + data.F, 0);
  return [sumA, sumB, sumC, sumD, sumE, sumF];
};

export const getLineChartData = (analyticsData: Data[], index: number) => {
  const uniqueDates = new Set<string>();
  const formatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
  });

  analyticsData.forEach((item) => {
    const formattedDate = formatter.format(new Date(item.date));
    const formattedWithDash = formattedDate.replace(" ", "-");
    uniqueDates.add(formattedWithDash);
  });
  const data: number[] = [];
  let currDate = "";
  let feature: "A" | "B" | "C" | "D" | "E" | "F" | "" = "";
  if (index === 0) {
    feature = "A";
  } else if (index === 1) {
    feature = "B";
  } else if (index === 2) {
    feature = "C";
  } else if (index === 3) {
    feature = "D";
  } else if (index === 4) {
    feature = "E";
  } else if (index === 5) {
    feature = "F";
  }
  if (feature == "") return { uniqueDates: Array.from(uniqueDates), data };

  analyticsData.forEach((item) => {
    if (item.date === currDate) {
      data[-1] += item[feature];
    } else {
      data.push(item[feature]);
      currDate = item.date;
    }
  });

  return { uniqueDates: Array.from(uniqueDates), data };
};

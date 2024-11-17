import axios from "axios";
import { Data, Query } from "../../../schemas/schemas";

export const getFilteredData = async (query: Query): Promise<Data[]> => {
  const data = await axios.get(process.env.SHEET_DATA_ENDPOINT as string);
  const extractedData: Data[] = data.data.data;
  const filteredData = extractedData.filter((item) => {
    const dateObj = new Date(query.startDate);
    dateObj.setDate(dateObj.getDate() - 1);
    if (
      new Date(item.date) >= new Date(dateObj) &&
      new Date(item.date) <= new Date(query.endDate) &&
      (query.ageGroup === "All" || item.age === query.ageGroup) &&
      (query.gender === "All" || item.gender === query.gender)
    )
      return true;
  });
  return filteredData;
};

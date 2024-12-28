import { getAllSeries } from "../api";
import { useQuery } from "react-query";

export const useFetchAllSeries = () => {
  return useQuery({
    queryKey: ["series"],
    queryFn: getAllSeries,
  });
};

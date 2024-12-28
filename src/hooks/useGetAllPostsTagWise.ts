import { getAllPostsTagWise } from "../api";
import { useQuery } from "react-query";

export const useGetAllPostsTagWise = () => {
  return useQuery({
    queryKey: ["all-posts-tag-wise"],
    queryFn: getAllPostsTagWise,
  });
}

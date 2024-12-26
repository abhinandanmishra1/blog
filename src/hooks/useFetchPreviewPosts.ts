import { getPreviewPosts } from "../api/hashnode";
import { useQuery } from "react-query";

export const useFetchPreviewPosts = () => {
  return useQuery({
    queryKey: ["previewPosts"],
    queryFn: getPreviewPosts,
  });
};

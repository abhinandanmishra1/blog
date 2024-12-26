import { fetchAllPosts, getPreviewPosts } from "../api/hashnode";

import { useQuery } from "react-query";

export const useFetchAllPosts = (showAll: boolean = false) => {
  return useQuery({
    queryKey: [showAll? "posts" : "previewPosts"],
    queryFn: showAll ? fetchAllPosts : getPreviewPosts,
    enabled: showAll,
  });
};

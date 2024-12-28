import { useEffect, useState } from "react";

import { HashnodePostNode } from "../types";
import { fetchAllPosts } from "../api/hashnode";
import { useQuery } from "react-query";

export const useFetchPosts = (cursor: string) => {
  const [allPosts, setAllPosts] = useState<HashnodePostNode[]>([]);

  const query = useQuery({
    queryKey: ["posts", cursor],
    queryFn: () => fetchAllPosts(cursor),
  });

  useEffect(() => {
    if (query.data?.posts) {
      if (!cursor) {
        setAllPosts(query.data?.posts || []);
      } else {
        setAllPosts((prev) => [...prev, ...query.data.posts]);
      }
    }
  }, [query.data?.posts]);

  return {
    ...query,
    posts: allPosts,
    pageInfo: query.data?.pageInfo,
  };
};

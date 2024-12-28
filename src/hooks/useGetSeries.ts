import { HashnodePosts, HashnodeSeries } from "../types";
import { useEffect, useState } from "react";

import { getSeries } from "../api/hashnode";
import { useQuery } from "react-query";

export const useGetSeries = (slug: string) => {
  const [cursor, setCursor] = useState("");
  const [series, setSeries] = useState<HashnodeSeries>({
    name: "",
    slug: "",
    description: { html: "" },
    views: 0,
    posts: {} as HashnodePosts,
    coverImage: "",
  });
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["series", slug, cursor],
    queryFn: () => getSeries(slug, cursor),
  });


  useEffect(() => {
    if (data) {
      if (!cursor) {
        setSeries(data);
      } else {
        setSeries((prev) => ({
          ...prev,
          posts: {
            ...prev.posts,
            edges: [...prev.posts.edges, ...data.posts.edges],
          },
        }));
      }

      // set query value to data for the empty cursor
      // so that next time when we fetch for the same series,
      // we don't have to fetch all the posts again

      // queryClient.setQueryData(["series", slug, ""], data);
      // setCursor(data.posts.pageInfo.endCursor);
    }
  }, [data]);

  const loadMore = () => {
    if (data?.posts.pageInfo.hasNextPage) {
      setCursor(data?.posts.pageInfo.endCursor || "");
    }
  };

  return {
    series,
    hasNextPage: data?.posts.pageInfo.hasNextPage,
    isLoading,
    error,
    loadMore,
  };
};

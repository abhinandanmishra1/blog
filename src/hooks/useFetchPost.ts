import { getPost } from "../api/hashnode";
import { useQuery } from "react-query";

export const useFetchPost = (slug?: string) => {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPost(slug),
    enabled: !!slug,
  });
};

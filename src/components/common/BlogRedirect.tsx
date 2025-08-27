import { Navigate, useParams } from "react-router-dom";

export const BlogRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/articles/${slug}`} replace />;
};
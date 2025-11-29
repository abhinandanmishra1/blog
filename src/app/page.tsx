import { AboutAuthor } from "@/components/profile";
import {
  ArticleGrid,
  Categories,
  Hero,
  Newsletter,
} from "@/components/home";

export default async function HomePage() {
  return (
    <>
      <Hero />
      <ArticleGrid />
      <AboutAuthor />
      <Categories />
      <Newsletter />
    </>
  );
}

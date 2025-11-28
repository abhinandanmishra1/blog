import {
  AboutAuthor,
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

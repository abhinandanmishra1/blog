import { AboutPage, Articles, BlogPost, CategoriesPage, HomePage } from "./pages";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components";
import { SeriesPage } from "./pages/Series";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/series" element={<SeriesPage />} />
      </Route>
    </Routes>
  );
}

export default App;

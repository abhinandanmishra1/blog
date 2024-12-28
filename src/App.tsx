import { AboutPage, Articles, BlogPost, CategoriesPage, HomePage } from "./pages";
import { Route, Routes } from "react-router-dom";

import { CategoryView } from "./pages/CategoryView";
import { Layout } from "./components";
import { SeriesPage } from "./pages/Series";
import SeriesView from "./pages/SeriesView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/categories" >
          <Route index element={<CategoriesPage />} />
          <Route path=":slug" element={<CategoryView />} />
        </Route>
        <Route path="/series" >
          <Route index element={<SeriesPage />} />
          <Route path=":slug" element={<SeriesView />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

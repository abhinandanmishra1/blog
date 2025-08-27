import { AboutPage, Articles, BlogPost, CategoriesPage, HomePage, MDXDemo, MDXDebug } from "./pages";
import { Route, Routes } from "react-router-dom";

import { CategoryView } from "./pages/CategoryView";
import { BlogRedirect } from "./components/common/BlogRedirect";
import { Layout } from "./components";
import { SeriesPage } from "./pages/Series";
import SeriesView from "./pages/SeriesView";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* Redirect old blog routes to articles */}
        <Route path="/blog/:slug" element={<BlogRedirect />} />
        <Route path="/articles/:slug" element={<BlogPost />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mdx-demo" element={<MDXDemo />} />
        <Route path="/mdx-debug" element={<MDXDebug />} />
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

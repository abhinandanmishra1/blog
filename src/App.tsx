import { AboutPage, Articles, BlogPost, HomePage } from "./pages";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./components";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;

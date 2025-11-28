import Footer from "./Footer";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
};

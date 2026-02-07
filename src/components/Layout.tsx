import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1 ${isHomePage ? 'pt-[132px] md:pt-[148px]' : 'pt-16 md:pt-20'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

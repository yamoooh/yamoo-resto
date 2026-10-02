import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFloat from "./WhatsAppFloat";
import AnnouncementBar from "./AnnouncementBar";
import BackButton from "./BackButton";

export const Layout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-[#1E3A2B] selection:text-white">
      <AnnouncementBar />
      <Navbar />
      <main className={`flex-1 ${isHome ? "pt-[96px] min-[1200px]:pt-[148px]" : "pt-[104px] min-[1200px]:pt-[156px]"}`}>
        {!isHome && (
          <div className="container-tight pt-2 pb-4">
            <BackButton />
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;

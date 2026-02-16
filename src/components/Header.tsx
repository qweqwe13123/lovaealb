import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isLocationsHub = location.pathname === "/locations";
  const isBrooklyn = location.pathname.startsWith("/locations/brooklyn");

  // When on Brooklyn pages, nav links point to Brooklyn sub-routes
  const navItems = isLocationsHub
    ? [
        { label: "Locations", path: "/locations" },
      ]
    : isBrooklyn
    ? [
        { label: "Home", path: "/locations/brooklyn" },
        { label: "Floor Plans", path: "/locations/brooklyn/floor-plans" },
        { label: "Amenities", path: "/locations/brooklyn/amenities" },
        { label: "Neighborhood", path: "/locations/brooklyn/neighborhood" },
        { label: "Contact", path: "/locations/brooklyn/contact" },
        { label: "Locations", path: "/locations" },
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Floor Plans", path: "/floor-plans" },
        { label: "Amenities", path: "/amenities" },
        { label: "Neighborhood", path: "/neighborhood" },
        { label: "Contact", path: "/contact" },
        { label: "Locations", path: "/locations" },
      ];

  const applyPath = isBrooklyn ? "/locations/brooklyn/floor-plans" : "/floor-plans";

  return (
    <>
      {/* Promo Banner */}
      {isHomePage && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-[#6B7A8C] text-white py-3 text-center">
          <div className="container mx-auto px-4">
            <p className="font-display font-bold text-lg md:text-xl">
              <span className="text-xl md:text-2xl">1</span> MONTH FREE!
            </p>
            <p className="text-sm text-white/90">On Select Homes; Restrictions Apply</p>
          </div>
        </div>
      )}
      
      <header className={`fixed left-0 right-0 z-50 bg-primary shadow-sm ${isHomePage ? 'top-[68px]' : 'top-0'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to={isBrooklyn ? "/locations/brooklyn" : "/"} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
                <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-xl text-primary-foreground tracking-wide">GREENLAND</span>
              <p className="text-[10px] text-primary-foreground/70 tracking-[0.2em] uppercase">Cozy Living</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 font-medium tracking-wide text-sm uppercase ${location.pathname === item.path ? "text-primary-foreground border-b-2 border-primary-foreground pb-1" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Apply Now Button */}
          <div className="hidden lg:block">
            <Link to={applyPath}>
              <Button className="bg-[#1e3a5f] text-white hover:bg-[#15293f] border-none">
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-primary-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-200 font-medium tracking-wide text-sm uppercase ${location.pathname === item.path ? "text-primary-foreground" : ""}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link to={applyPath} onClick={() => setIsMenuOpen(false)}>
                <Button className="bg-[#1e3a5f] text-white hover:bg-[#15293f] border-none w-fit mt-2">
                  Apply Now
                </Button>
              </Link>
            </div>
          </nav>
        )}
        </div>
      </header>
    </>
  );
};

export default Header;

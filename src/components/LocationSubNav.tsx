import { Link, useLocation } from "react-router-dom";

interface LocationSubNavProps {
  basePath: string;
  cityName: string;
  switchTo: { label: string; path: string };
}

const subNavItems = [
  { label: "Home", path: "" },
  { label: "Floor Plans", path: "/floor-plans" },
  { label: "Amenities", path: "/amenities" },
  { label: "Neighborhood", path: "/neighborhood" },
  { label: "Contact", path: "/contact" },
];

const LocationSubNav = ({ basePath, cityName, switchTo }: LocationSubNavProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    const fullPath = basePath + path;
    return location.pathname === fullPath;
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-1 overflow-x-auto py-3">
            {subNavItems.map((item) => (
              <Link
                key={item.path}
                to={basePath + item.path}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            to={switchTo.path}
            className="text-sm text-primary hover:underline whitespace-nowrap ml-4"
          >
            → {switchTo.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LocationSubNav;

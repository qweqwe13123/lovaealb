import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { MapPin } from "lucide-react";

const locations = [
  {
    city: "Portland, OR",
    address: "5855 SE 72ND AVENUE, Portland, OR 97206",
    description: "Discover comfortable living in one of Portland's most desirable neighborhoods.",
    path: "/",
  },
  {
    city: "Brooklyn, NY",
    address: "2 Crown St, Brooklyn, NY 11225, USA",
    description: "Discover comfortable living in the heart of Brooklyn's Crown Heights.",
    path: "/locations/brooklyn",
  },
];

const Locations = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Our Locations
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Choose a location to learn more about our communities.
          </p>
        </div>
      </section>

      {/* Location Cards */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {locations.map((loc) => (
              <Link
                key={loc.path}
                to={loc.path}
                className="group bg-card rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="h-48 bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-display font-bold mb-2">{loc.city}</h2>
                  <p className="text-muted-foreground text-sm mb-3">{loc.address}</p>
                  <p className="text-muted-foreground">{loc.description}</p>
                  <span className="inline-block mt-4 text-primary font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Locations;

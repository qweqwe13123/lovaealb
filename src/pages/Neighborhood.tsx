import Layout from "@/components/Layout";
import { MapPin, Coffee, ShoppingBag, Utensils, TreePine, Train } from "lucide-react";
import downtownImage from "@/assets/neighborhood-downtown.jpg";
import parkImage from "@/assets/neighborhood-park.jpg";

const nearbyPlaces = [
  { icon: Coffee, name: "Local Coffee Shops", description: "Multiple artisan coffee roasters nearby" },
  { icon: Utensils, name: "Restaurants & Dining", description: "Diverse cuisine options from casual to fine dining" },
  { icon: ShoppingBag, name: "Shopping Centers", description: "Boutiques, groceries, and major retailers" },
  { icon: TreePine, name: "Parks & Recreation", description: "Green spaces and hiking trails" },
  { icon: Train, name: "Public Transit", description: "MAX Light Rail and bus stops nearby" },
];

const Neighborhood = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Neighborhood
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover the vibrant Portland lifestyle right outside your door at Greenland.
          </p>
        </div>
      </section>

      {/* Location Overview */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Welcome to Portland Living</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Located in one of Portland's most desirable neighborhoods, Greenland offers easy access to everything the city has to offer. From shopping to beautiful parks and outdoor recreation, your new home puts you at the center of it all.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Portland is known for its unique culture, incredible food scene, and stunning natural beauty. Whether you're exploring the local farmers markets, hiking in Forest Park, or enjoying the city's famous coffee culture, there's always something new to discover.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <img
                src={downtownImage}
                alt="Portland downtown"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="py-16 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">What's Nearby</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyPlaces.map((place, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <place.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg">{place.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{place.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parks Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
              <img
                src={parkImage}
                alt="Portland parks"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-display font-bold mb-6">Nature at Your Doorstep</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Portland is famous for its beautiful parks and outdoor spaces. From the expansive Forest Park to the scenic Waterfront Park along the Willamette River, you'll never be far from nature.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Mt. Scott Park - Community park with pool and tennis courts</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Forest Park - 5,200 acres of urban wilderness</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Find Us</h2>
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-greenland-cream-dark flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-display font-semibold">5855 SE 72ND AVENUE</p>
                <p className="text-muted-foreground">Portland, OR 97206</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Neighborhood;

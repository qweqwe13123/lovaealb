import Layout from "@/components/Layout";
import { Dumbbell, Trees, Building2, Car, Wifi, Shield, Dog, Coffee } from "lucide-react";
import fitnessImage from "@/assets/amenity-fitness.jpg";
import rooftopImage from "@/assets/amenity-rooftop.jpg";
import courtyardImage from "@/assets/amenity-courtyard.jpg";

const communityAmenities = [
  { icon: Building2, title: "Rooftop Terrace", description: "Stunning city views with lounge seating and fire pit" },
  { icon: Dumbbell, title: "Fitness Center", description: "State-of-the-art equipment available 24/7" },
  { icon: Trees, title: "Courtyard", description: "Peaceful garden with walking paths and seating areas" },
  { icon: Car, title: "Covered Parking", description: "Secure underground parking for residents" },
  { icon: Dog, title: "Pet Friendly", description: "Welcoming community for your furry friends" },
  { icon: Coffee, title: "Resident Lounge", description: "Comfortable space for work and relaxation" },
];

const apartmentAmenities = [
  { icon: Wifi, title: "High-Speed Internet", description: "Fiber-optic internet ready" },
  { icon: Shield, title: "Smart Locks", description: "Keyless entry for convenience and security" },
];

const Amenities = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Amenities
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover the thoughtful amenities designed to enhance your everyday living at Greenland.
          </p>
        </div>
      </section>

      {/* Featured Images */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img src={fitnessImage} alt="Fitness Center" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-white font-display text-xl font-bold">Fitness Center</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img src={rooftopImage} alt="Rooftop Terrace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-white font-display text-xl font-bold">Rooftop Terrace</h3>
              </div>
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <img src={courtyardImage} alt="Courtyard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                <h3 className="text-white font-display text-xl font-bold">Courtyard Garden</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Amenities */}
      <section className="py-16 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Community Amenities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityAmenities.map((amenity, index) => (
              <div key={index} className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <amenity.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment Features */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">Apartment Features</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Modern Kitchen</h4>
                  <p className="text-sm text-muted-foreground">Stainless steel appliances & granite countertops</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">In-Unit Washer/Dryer</h4>
                  <p className="text-sm text-muted-foreground">Full-size washer and dryer in every unit</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Private Balcony/Patio</h4>
                  <p className="text-sm text-muted-foreground">Enjoy outdoor space with every apartment</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Hardwood Floors</h4>
                  <p className="text-sm text-muted-foreground">Beautiful wood-style flooring throughout</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Walk-In Closets</h4>
                  <p className="text-sm text-muted-foreground">Ample storage space in bedrooms</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 bg-card rounded-lg shadow">
                <div className="w-2 bg-primary rounded-full"></div>
                <div>
                  <h4 className="font-semibold">Air Conditioning</h4>
                  <p className="text-sm text-muted-foreground">Central heating and cooling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;

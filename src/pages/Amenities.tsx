import Layout from "@/components/Layout";
import { 
  Dumbbell, 
  Trees, 
  Building2, 
  Car, 
  Wifi, 
  Shield, 
  Dog, 
  Coffee,
  Snowflake,
  WashingMachine,
  Home,
  Warehouse
} from "lucide-react";
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

const apartmentFeatures = [
  { icon: Home, title: "Modern Kitchen", description: "Stainless steel appliances & granite countertops" },
  { icon: WashingMachine, title: "In-Unit Washer/Dryer", description: "Full-size washer and dryer in every unit" },
  { icon: Warehouse, title: "Walk-In Closets", description: "Ample storage space in bedrooms" },
  { icon: Snowflake, title: "Air Conditioning", description: "Central heating and cooling" },
  { icon: Wifi, title: "High-Speed Internet", description: "Fiber-optic internet ready" },
  { icon: Shield, title: "Smart Locks", description: "Keyless entry for convenience and security" },
];

const Amenities = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block text-greenland-gold text-sm font-semibold tracking-widest uppercase mb-4">
            Live Your Best Life
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Amenities & Features
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Discover the thoughtful amenities designed to enhance your everyday living at Greenland. 
            Every detail crafted for your comfort.
          </p>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Spaces</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the beautiful shared spaces designed for relaxation, fitness, and connection
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={fitnessImage} 
                alt="Fitness Center" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Dumbbell className="w-5 h-5 text-greenland-gold" />
                  <span className="text-greenland-gold text-sm font-semibold uppercase tracking-wide">24/7 Access</span>
                </div>
                <h3 className="text-white font-display text-2xl font-bold">Fitness Center</h3>
                <p className="text-white/70 text-sm mt-1">State-of-the-art equipment for your wellness journey</p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={rooftopImage} 
                alt="Rooftop Terrace" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Building2 className="w-5 h-5 text-greenland-gold" />
                  <span className="text-greenland-gold text-sm font-semibold uppercase tracking-wide">City Views</span>
                </div>
                <h3 className="text-white font-display text-2xl font-bold">Rooftop Terrace</h3>
                <p className="text-white/70 text-sm mt-1">Stunning panoramic views with lounge seating</p>
              </div>
            </div>
            <div className="group relative h-80 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src={courtyardImage} 
                alt="Courtyard" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Trees className="w-5 h-5 text-greenland-gold" />
                  <span className="text-greenland-gold text-sm font-semibold uppercase tracking-wide">Peaceful Oasis</span>
                </div>
                <h3 className="text-white font-display text-2xl font-bold">Courtyard Garden</h3>
                <p className="text-white/70 text-sm mt-1">Serene outdoor space with walking paths</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Amenities */}
      <section className="py-20 bg-greenland-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
              Community Living
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Community Amenities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience the best of Portland living with our thoughtfully curated amenities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityAmenities.map((amenity, index) => (
              <div 
                key={index} 
                className="group bg-card p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-primary/20"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <amenity.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3">{amenity.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apartment Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-primary text-sm font-semibold tracking-widest uppercase mb-4">
                Your Home
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
                Apartment Features
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                Every apartment at Greenland is designed with your comfort in mind. 
                From modern finishes to practical conveniences, we've thought of everything.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {apartmentFeatures.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-greenland-cream rounded-xl"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-full"></div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-greenland-gold/10 rounded-full"></div>
              <div className="relative grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-48 rounded-2xl overflow-hidden">
                    <img 
                      src={fitnessImage} 
                      alt="Apartment interior" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-64 rounded-2xl overflow-hidden">
                    <img 
                      src={courtyardImage} 
                      alt="Apartment kitchen" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="h-64 rounded-2xl overflow-hidden">
                    <img 
                      src={rooftopImage} 
                      alt="Apartment living room" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="h-48 rounded-2xl overflow-hidden bg-primary flex items-center justify-center">
                    <div className="text-center p-6">
                      <span className="text-4xl font-display font-bold text-primary-foreground">24/7</span>
                      <p className="text-primary-foreground/80 text-sm mt-2">Maintenance Support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-6">
            Ready to Experience Greenland?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Schedule a tour today and discover your new home in Portland's most welcoming community.
          </p>
          <a 
            href="/contact" 
            className="inline-block bg-greenland-gold hover:bg-greenland-gold-light text-foreground font-semibold px-10 py-4 rounded-lg transition-colors shadow-lg"
          >
            Contact Us Today
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Amenities;

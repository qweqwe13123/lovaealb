import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-brooklyn.jpg";
import modernLivingImage from "@/assets/modern-living.png";
import petFriendlyImage from "@/assets/pet-friendly.jpg";
import { Bed, PawPrint, UtensilsCrossed, Sofa } from "lucide-react";

const BrooklynHome = () => {
  return (
    <Layout>

      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Brooklyn cityscape" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 px-4 w-full max-w-2xl mx-auto">
          <div className="bg-primary rounded-3xl overflow-hidden shadow-2xl">
            <div className="px-8 py-12 md:px-12 md:py-16 text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6 leading-tight">
                Experience Cozy Living in Brooklyn
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/90 mb-10 leading-relaxed">
                At Greenland, residents enjoy a warm and inviting community with beautifully designed apartments, perfect for students, families, and seniors alike!
              </p>
              <Link to="/locations/brooklyn/floor-plans">
                <Button className="bg-greenland-gold hover:bg-greenland-gold-light text-foreground px-10 py-6 text-lg font-semibold tracking-wide rounded-lg shadow-lg">
                  CHECK AVAILABILITY
                </Button>
              </Link>
            </div>
            <div className="bg-white/90 py-4 text-center">
              <span className="text-muted-foreground text-sm tracking-wide">greenlandoregon.com</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Greenland — Apartments in Brooklyn
          </h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-primary-foreground/90">
            Discover Greenland, a welcoming apartment community designed for comfortable everyday living. Our thoughtfully designed, pet-friendly apartments offer a warm and inviting place to call home for professionals, students, families, seniors, and everyone in between. With a focus on comfort, convenience, and a sense of community, Greenland is a place where you can truly feel at home.
          </p>
          <div className="flex justify-center mt-12 max-w-4xl mx-auto">
            <Link to="/locations/brooklyn/floor-plans">
              <button className="bg-greenland-gold hover:bg-greenland-gold-light transition-colors py-4 px-6 rounded text-lg font-semibold tracking-wide text-foreground">
                APPLY
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Living Section */}
      <section className="relative">
        <img src={modernLivingImage} alt="Modern Living apartments" className="w-full h-auto object-cover" loading="lazy" />
      </section>

      {/* Pet Friendly Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img src={petFriendlyImage} alt="Pet friendly community" className="w-full h-full object-cover object-center" loading="lazy" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/50"></div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Pet Friendly</h2>
            <div className="h-px w-12 bg-white/50"></div>
          </div>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-white/90">
            At Greenland, we understand that your pet is a member of your family. That's why we're happy to welcome your furry friends to our community. Please contact us for breed restrictions and additional information.
          </p>
        </div>
      </section>

      {/* Everything You Need Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-10 italic">
              Everything You Need<br />to Feel at Home
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Bed className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                <span className="text-lg text-primary-foreground">Studios, 1 & 2 Bedroom Apartments</span>
              </div>
              <div className="flex items-center gap-4">
                <PawPrint className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                <span className="text-lg text-primary-foreground">Pet-Friendly Community</span>
              </div>
              <div className="flex items-center gap-4">
                <UtensilsCrossed className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                <span className="text-lg text-primary-foreground">Fully Equipped Kitchens</span>
              </div>
              <div className="flex items-center gap-4">
                <Sofa className="w-7 h-7 text-primary-foreground flex-shrink-0" />
                <span className="text-lg text-primary-foreground">Comfortable, Modern Interiors</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrooklynHome;

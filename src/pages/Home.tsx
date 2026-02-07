import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-portland.jpg";
import modernLivingImage from "@/assets/modern-living.png";
import petFriendlyImage from "@/assets/pet-friendly.jpg";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Portland cityscape at night"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative z-10 px-4 w-full max-w-2xl mx-auto">
          {/* Green Card Container */}
          <div className="bg-primary rounded-3xl px-8 py-12 md:px-12 md:py-16 text-center shadow-2xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground mb-6 leading-tight">
              Experience Cozy Living in Oregon
            </h1>
            <p className="text-base md:text-lg text-primary-foreground/90 mb-10 leading-relaxed">
              At Greenland, residents enjoy a warm and inviting community with beautifully designed apartments, perfect for students, families, and seniors alike!
            </p>
            <Link to="/floor-plans">
              <Button 
                className="bg-greenland-gold hover:bg-greenland-gold-light text-foreground px-10 py-6 text-lg font-semibold tracking-wide rounded-lg shadow-lg"
              >
                CHECK AVAILABILITY
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">
            Greenland — Apartments in Oregon
          </h2>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-primary-foreground/90">
            Discover Greenland, a welcoming apartment community designed for comfortable everyday living. Our thoughtfully designed, pet-friendly apartments offer a warm and inviting place to call home for professionals, students, families, seniors, and everyone in between. With a focus on comfort, convenience, and a sense of community, Greenland is a place where you can truly feel at home.
          </p>
          <div className="flex justify-center mt-12 max-w-4xl mx-auto">
            <Link to="/floor-plans">
              <button className="bg-greenland-gold hover:bg-greenland-gold-light transition-colors py-4 px-6 rounded text-lg font-semibold tracking-wide text-foreground">
                APPLY
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern Living Section - Full Image Only */}
      <section className="relative">
        <img
          src={modernLivingImage}
          alt="Modern Living apartments with city views"
          className="w-full h-auto object-cover"
          loading="lazy"
        />
      </section>

      {/* Pet Friendly Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src={petFriendlyImage}
            alt="Pet friendly community - cat and dog cuddling"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
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
    </Layout>
  );
};

export default Home;

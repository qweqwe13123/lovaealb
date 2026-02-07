import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-rooftop.jpg";
import galleryImage from "@/assets/gallery-rooftop.jpg";
import petsImage from "@/assets/pets-new.jpg";

const Home = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Luxury rooftop terrace in Portland"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 animate-fade-in tracking-wide">
            Experience Cozy Living in Oregon
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            At Greenland, residents enjoy a warm and inviting community with beautifully designed apartments, perfect for professionals, students, families, and seniors alike!
          </p>
          <Link to="/floor-plans">
            <Button 
              className="bg-primary hover:bg-greenland-green-dark text-primary-foreground px-8 py-6 text-lg animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              CHECK AVAILABILITY
            </Button>
          </Link>
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

      {/* Modern Living Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src={galleryImage}
            alt="Modern living at Greenland"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/50"></div>
            <h2 className="text-3xl md:text-5xl font-display font-bold">Modern Living</h2>
            <div className="h-px w-12 bg-white/50"></div>
          </div>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-white/90 mb-6">
            When you choose one of our apartments in Portland, Oregon, you get more than a place to live – you get a place to relax and proudly call home. Whether you select one of our studios, one-, or two-bedroom apartments, your experience will be just as sweet. Each of our apartment homes have been crafted with style and are fully equipped with kitchen appliances and a personal patio or balcony.
          </p>
          <p className="max-w-4xl mx-auto text-lg leading-relaxed text-white/90">
            Designed to create the perfect living environment, our community offers the ambiance that you will be happy to return to every day. With you in mind, we offer community amenities that you will love, including a rooftop terrace, fitness center, and courtyard. Add in our helpful management team, and your apartment living experience becomes complete.
          </p>
        </div>
      </section>

      {/* Pet Friendly Section */}
      <section className="relative py-32">
        <div className="absolute inset-0">
          <img
            src={petsImage}
            alt="Pet friendly community"
            className="w-full h-full object-cover object-center"
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

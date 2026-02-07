import { useState } from "react";
import Layout from "@/components/Layout";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import heroImage from "@/assets/hero-rooftop.jpg";
import galleryRooftop from "@/assets/gallery-rooftop.jpg";
import petsImage from "@/assets/pets.jpg";
import studioImage from "@/assets/floor-plan-studio.jpg";
import oneBrImage from "@/assets/floor-plan-1br.jpg";
import twoBrImage from "@/assets/floor-plan-2br.jpg";
import fitnessImage from "@/assets/amenity-fitness.jpg";
import rooftopImage from "@/assets/amenity-rooftop.jpg";
import courtyardImage from "@/assets/amenity-courtyard.jpg";

const galleryImages = [
  { src: heroImage, alt: "Rooftop terrace at sunset", category: "Exterior" },
  { src: galleryRooftop, alt: "Modern living spaces", category: "Exterior" },
  { src: studioImage, alt: "Studio apartment", category: "Interiors" },
  { src: oneBrImage, alt: "One bedroom apartment", category: "Interiors" },
  { src: twoBrImage, alt: "Two bedroom apartment", category: "Interiors" },
  { src: fitnessImage, alt: "Fitness center", category: "Amenities" },
  { src: rooftopImage, alt: "Rooftop lounge", category: "Amenities" },
  { src: courtyardImage, alt: "Courtyard garden", category: "Amenities" },
  { src: petsImage, alt: "Pet friendly community", category: "Community" },
];

const categories = ["All", "Exterior", "Interiors", "Amenities", "Community"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Gallery
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Take a visual tour of Greenland and imagine yourself living in our beautiful community.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer group"
                onClick={() => setSelectedImage(image.src)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-display text-lg">
                    View
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Gallery image"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Gallery;

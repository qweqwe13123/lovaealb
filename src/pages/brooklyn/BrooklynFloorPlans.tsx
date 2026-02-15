import { Link } from "react-router-dom";
import { useState } from "react";
import Layout from "@/components/Layout";
import LocationSubNav from "@/components/LocationSubNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaLightbox from "@/components/MediaLightbox";
import studioImage from "@/assets/floor-plan-studio.jpg";
import oneBrImage from "@/assets/floor-plan-1br.jpg";
import twoBrImage from "@/assets/floor-plan-2br.jpg";
import studioNewVideo from "@/assets/studio-new-1.mp4";
import studioNew2 from "@/assets/studio-new-2.jpg";
import studioNew3 from "@/assets/studio-new-3.jpg";
import studioNew4 from "@/assets/studio-new-4.jpg";
import studioNew5 from "@/assets/studio-new-5.jpg";
import studioNew6 from "@/assets/studio-new-6.jpg";
import studioNew7 from "@/assets/studio-new-7.jpg";
import threeBrFloorPlan from "@/assets/3bed-floor-plan.jpg";
import twoBrVideo from "@/assets/2br-video.mov";
import twoBr1 from "@/assets/2br-1.jpg";
import twoBr2 from "@/assets/2br-2.jpg";
import twoBr3 from "@/assets/2br-3.jpg";
import twoBr4 from "@/assets/2br-4.jpg";
import twoBr5 from "@/assets/2br-5.jpg";
import twoBr6 from "@/assets/2br-6.jpg";
import twoBr7 from "@/assets/2br-7.jpg";
import twoBr8 from "@/assets/2br-8.jpg";
import twoBr9 from "@/assets/2br-9.jpg";
import oneBrVideo from "@/assets/1br-video.mp4";
import oneBr1 from "@/assets/1br-1.jpg";
import oneBr2 from "@/assets/1br-2.jpg";
import oneBr3 from "@/assets/1br-3.jpg";
import oneBr4 from "@/assets/1br-4.jpg";
import oneBr5 from "@/assets/1br-5.jpg";
import oneBr6 from "@/assets/1br-6.jpg";
import oneBr7 from "@/assets/1br-7.jpg";
import oneBr8 from "@/assets/1br-8.jpg";
import oneBr9 from "@/assets/1br-9.jpg";

const studioMedia = [
  { type: "video" as const, src: studioNewVideo },
  { type: "image" as const, src: studioNew2 },
  { type: "image" as const, src: studioNew3 },
  { type: "image" as const, src: studioNew4 },
  { type: "image" as const, src: studioNew5 },
  { type: "image" as const, src: studioNew6 },
  { type: "image" as const, src: studioNew7 },
];

const threeBrMedia = [
  { type: "image" as const, src: threeBrFloorPlan },
];

const twoBrMedia = [
  { type: "video" as const, src: twoBrVideo },
  { type: "image" as const, src: twoBr1 },
  { type: "image" as const, src: twoBr2 },
  { type: "image" as const, src: twoBr3 },
  { type: "image" as const, src: twoBr4 },
  { type: "image" as const, src: twoBr5 },
  { type: "image" as const, src: twoBr6 },
  { type: "image" as const, src: twoBr7 },
  { type: "image" as const, src: twoBr8 },
  { type: "image" as const, src: twoBr9 },
];

const oneBrMedia = [
  { type: "video" as const, src: oneBrVideo },
  { type: "image" as const, src: oneBr1 },
  { type: "image" as const, src: oneBr2 },
  { type: "image" as const, src: oneBr3 },
  { type: "image" as const, src: oneBr4 },
  { type: "image" as const, src: oneBr5 },
  { type: "image" as const, src: oneBr6 },
  { type: "image" as const, src: oneBr7 },
  { type: "image" as const, src: oneBr8 },
  { type: "image" as const, src: oneBr9 },
];

const floorPlans = [
  {
    id: 1, name: "Studio", sqft: "450-550", beds: 0, baths: 1, price: "$1,055",
    image: studioImage, features: ["Modern kitchen", "Extra storage", "In-unit washer/dryer"],
    hasCarousel: true, mediaType: "studio",
  },
  {
    id: 2, name: "One Bedroom", sqft: "650-750", beds: 1, baths: 1, price: "$1,175",
    image: oneBrImage, features: ["Modern kitchen", "In-unit washer/dryer", "City views"],
    hasCarousel: true, mediaType: "oneBr",
  },
  {
    id: 3, name: "Two Bedroom", sqft: "900-1,100", beds: 2, baths: 1, price: "$1,355",
    image: twoBrImage, features: ["Modern kitchen", "In-unit washer/dryer", "Extra storage"],
    hasCarousel: true, mediaType: "twoBr",
  },
  {
    id: 4, name: "Three Bedroom", sqft: "1,200-1,400", beds: 3, baths: 1, price: "$2,060",
    image: studioNew2, features: ["Modern kitchen", "In-unit washer/dryer", "Extra storage"],
    hasCarousel: true, mediaType: "threeBr",
  },
];

const BrooklynFloorPlans = () => {
  const [studioIndex, setStudioIndex] = useState(0);
  const [threeBrIndex, setThreeBrIndex] = useState(0);
  const [oneBrIndex, setOneBrIndex] = useState(0);
  const [twoBrIndex, setTwoBrIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<typeof studioMedia>([]);
  const [lightboxInitialIndex, setLightboxInitialIndex] = useState(0);

  const getMediaArray = (mediaType: string | null) => {
    if (mediaType === "studio") return { media: studioMedia, index: studioIndex, setIndex: setStudioIndex, next: () => setStudioIndex((p) => (p + 1) % studioMedia.length), prev: () => setStudioIndex((p) => (p - 1 + studioMedia.length) % studioMedia.length) };
    if (mediaType === "threeBr") return { media: threeBrMedia, index: threeBrIndex, setIndex: setThreeBrIndex, next: () => setThreeBrIndex((p) => (p + 1) % threeBrMedia.length), prev: () => setThreeBrIndex((p) => (p - 1 + threeBrMedia.length) % threeBrMedia.length) };
    if (mediaType === "oneBr") return { media: oneBrMedia, index: oneBrIndex, setIndex: setOneBrIndex, next: () => setOneBrIndex((p) => (p + 1) % oneBrMedia.length), prev: () => setOneBrIndex((p) => (p - 1 + oneBrMedia.length) % oneBrMedia.length) };
    if (mediaType === "twoBr") return { media: twoBrMedia, index: twoBrIndex, setIndex: setTwoBrIndex, next: () => setTwoBrIndex((p) => (p + 1) % twoBrMedia.length), prev: () => setTwoBrIndex((p) => (p - 1 + twoBrMedia.length) % twoBrMedia.length) };
    return null;
  };

  const openLightbox = (media: typeof studioMedia, index: number) => {
    setLightboxMedia(media);
    setLightboxInitialIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <Layout>
        <LocationSubNav basePath="/locations/brooklyn" cityName="Brooklyn, NY" switchTo={{ label: "Portland, OR", path: "/locations/portland" }} />

        <section className="relative py-24 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">Floor Plans</h1>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Find your perfect home at Greenland Brooklyn. Choose from our thoughtfully designed studios, one-bedroom, and two-bedroom apartments.
            </p>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {floorPlans.map((plan) => {
                const mediaData = getMediaArray(plan.mediaType);
                return (
                  <Card key={plan.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    {plan.hasCarousel && mediaData ? (
                      <div className="relative h-56 cursor-pointer" onClick={() => openLightbox(mediaData.media, mediaData.index)}>
                        {mediaData.media[mediaData.index].type === "video" ? (
                          <video src={mediaData.media[mediaData.index].src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                        ) : (
                          <img src={mediaData.media[mediaData.index].src} alt={`${plan.name} ${mediaData.index + 1}`} className="w-full h-full object-cover" />
                        )}
                        <button onClick={(e) => { e.stopPropagation(); mediaData.prev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); mediaData.next(); }} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                          {mediaData.media.map((_, idx) => (
                            <button key={idx} onClick={(e) => { e.stopPropagation(); mediaData.setIndex(idx); }} className={`w-2 h-2 rounded-full transition-colors ${idx === mediaData.index ? "bg-white" : "bg-white/50"}`} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-56">
                        <img src={plan.image} alt={plan.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="font-display text-2xl">{plan.name}</CardTitle>
                      <p className="text-2xl font-bold text-primary">{plan.price}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 mb-4 text-muted-foreground">
                        <span>{plan.beds === 0 ? "Studio" : `${plan.beds} Bed`}</span>
                        <span>•</span>
                        <span>{plan.baths} Bath</span>
                        <span>•</span>
                        <span>{plan.sqft} sq ft</span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link to="/apply" className="w-full">
                        <Button className="w-full bg-primary hover:bg-greenland-green-dark">Apply Now</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </Layout>

      <MediaLightbox media={lightboxMedia} initialIndex={lightboxInitialIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  );
};

export default BrooklynFloorPlans;

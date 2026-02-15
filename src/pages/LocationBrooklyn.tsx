import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock, Coffee, ShoppingBag, Utensils, TreePine, Train } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const nearbyPlaces = [
  { icon: Coffee, name: "Local Coffee Shops", description: "Artisan coffee roasters and cozy cafés throughout Brooklyn" },
  { icon: Utensils, name: "Restaurants & Dining", description: "Diverse cuisine from Caribbean to artisan pizzerias" },
  { icon: ShoppingBag, name: "Shopping Centers", description: "Boutiques, grocery stores, and local markets" },
  { icon: TreePine, name: "Parks & Recreation", description: "Prospect Park and community green spaces" },
  { icon: Train, name: "Public Transit", description: "Subway lines and bus routes nearby" },
];

const LocationBrooklyn = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">
            Brooklyn, New York
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Discover comfortable living in the heart of Brooklyn. Reach out to schedule a tour or ask any questions.
          </p>
          <Link to="/locations/portland" className="inline-block mt-4 text-primary-foreground/60 hover:text-primary-foreground underline text-sm">
            Switch to Portland, OR →
          </Link>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-display font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about what you're looking for..." />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-greenland-green-dark">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Address</h3>
                    <p className="text-muted-foreground">2 Crown St<br />Brooklyn, NY 11225, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Phone</h3>
                    <p className="text-muted-foreground">(503) 673-9426</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">greenlandlivingofficial@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Office Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 5pm<br />
                      Sunday: 12pm - 5pm
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhood Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">Welcome to Brooklyn Living</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Located in one of Brooklyn's most vibrant neighborhoods, Greenland offers easy access to everything New York City has to offer. From shopping to beautiful parks and outdoor recreation, your new home puts you at the center of it all.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Brooklyn is known for its diverse culture, incredible food scene, and thriving arts community. Whether you're exploring the local farmers markets, strolling through Prospect Park, or enjoying the borough's famous coffee culture, there's always something new to discover.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl bg-greenland-cream-dark flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-display font-semibold">Brooklyn, NY</p>
                <p className="text-muted-foreground">Crown Heights</p>
              </div>
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

      {/* Nature Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl bg-greenland-cream-dark flex items-center justify-center order-2 md:order-1">
              <div className="text-center">
                <TreePine className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-display font-semibold">Green Spaces</p>
                <p className="text-muted-foreground">Parks & Recreation</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-display font-bold mb-6">Nature at Your Doorstep</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Brooklyn is home to some of New York's most beautiful parks and outdoor spaces. From the expansive Prospect Park to the Brooklyn Botanic Garden, you'll never be far from nature.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Prospect Park - 526 acres of urban oasis</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Brooklyn Botanic Garden - World-class botanical gardens</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-8">Find Us</h2>
          <div className="bg-card rounded-lg shadow-lg overflow-hidden">
            <div className="h-96 bg-greenland-cream-dark flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-xl font-display font-semibold">2 Crown St</p>
                <p className="text-muted-foreground">Brooklyn, NY 11225, USA</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LocationBrooklyn;

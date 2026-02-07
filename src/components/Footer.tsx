import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  const handleQuickLinkClick = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-primary" fill="currentColor">
                  <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-xl tracking-wide">GREENLAND</span>
                <p className="text-[10px] text-primary-foreground/70 tracking-[0.2em] uppercase">Cozy Living</p>
              </div>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Experience comfortable living in Portland's most welcoming apartment community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => handleQuickLinkClick('/floor-plans')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Floor Plans</button></li>
              <li><button onClick={() => handleQuickLinkClick('/amenities')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Amenities</button></li>
              <li><button onClick={() => handleQuickLinkClick('/neighborhood')} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">Neighborhood</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>5855 SE 72ND AVENUE, Portland, OR 97206</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>(503) 673-9426</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>greenlandlivingofficial@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Office Hours</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>Monday - Friday: 9am - 6pm</li>
              <li>Saturday: 10am - 5pm</li>
              <li>Sunday: 12pm - 5pm</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2024 Greenland Apartments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

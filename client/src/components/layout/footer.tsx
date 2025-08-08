import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";

export function Footer() {
  return (
    <footer className="py-16 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoPath} 
                alt="Lion's Café & Bakery Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-white">Lion's Café</span>
            </div>
            <p className="text-gray-400 mb-4">
              Where artisan craftsmanship meets coffee culture.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-brand-orange transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/menu">
                  <span className="hover:text-brand-orange transition-colors cursor-pointer">
                    Menu
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/reservations">
                  <span className="hover:text-brand-orange transition-colors cursor-pointer">
                    Reservations
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/story">
                  <span className="hover:text-brand-orange transition-colors cursor-pointer">
                    Our Story
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-brand-orange transition-colors">
                  Catering
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-brand-orange flex-shrink-0" />
                <span>123 Artisan Street, Coffee District</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-brand-orange flex-shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-brand-orange flex-shrink-0" />
                <span>hello@lionscafe.com</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex justify-between">
                <span>Mon - Fri</span>
                <span>6:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday</span>
                <span>7:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Lion's Café & Bakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

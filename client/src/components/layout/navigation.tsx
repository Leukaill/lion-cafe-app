import { useState } from "react";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, X, Crown, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/hooks/use-cart";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { items } = useCart();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
    { href: "/story", label: "Our Story" },
  ];

  return (
    <nav className="floating-nav fixed top-0 left-0 right-0 z-50 backdrop-blur-[20px] bg-gray-900/90 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer">
              <img 
                src={logoPath} 
                alt="Lion's Café & Bakery Logo" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-xl font-bold text-white">Lion's Café</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-brand-orange"
                      : "text-gray-300 hover:text-brand-orange"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            
            {/* Cart Button */}
            <Link href="/cart">
              <GlassCard className="px-4 py-2 hover:bg-brand-orange/20 cursor-pointer">
                <div className="flex items-center space-x-2 text-white">
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({totalItems})</span>
                </div>
              </GlassCard>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">Hi, {user.username}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-gray-300 hover:text-white"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <GlassCard className="px-4 py-2 hover:bg-brand-orange/20 cursor-pointer">
                  <div className="flex items-center space-x-2 text-white">
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                </GlassCard>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <GlassCard className="p-2">
              {isMobileMenuOpen ? (
                <X className="text-white w-6 h-6" />
              ) : (
                <Menu className="text-white w-6 h-6" />
              )}
            </GlassCard>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <GlassCard 
            variant="dark" 
            className="mx-4 my-2 p-4 space-y-4"
          >
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`block py-2 transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-brand-orange"
                      : "text-gray-300 hover:text-brand-orange"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
            <div className="border-t border-white/10 pt-4 space-y-2">
              <Link href="/cart">
                <div 
                  className="flex items-center space-x-2 text-white py-2 cursor-pointer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Cart ({totalItems})</span>
                </div>
              </Link>
              {user ? (
                <div className="space-y-2">
                  <div className="text-gray-300 py-2">Hi, {user.username}</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-white py-2"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link href="/auth">
                  <div 
                    className="flex items-center space-x-2 text-white py-2 cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </div>
                </Link>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </nav>
  );
}

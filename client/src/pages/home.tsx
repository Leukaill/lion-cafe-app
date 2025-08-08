import { useState } from "react";
import { ChevronDown, Utensils, Store, Smartphone, Calendar, Bell, User as UserIcon } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/menu/menu-item";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";

export default function Home() {
  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ['/api/menu'],
    select: (data: MenuItem[]) => data.slice(0, 6), // Show first 6 items as featured
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
            alt="Artisanal breads and pastries display"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <GlassCard variant="dark" className="p-8 md:p-12 mx-4">
            <div className="w-20 h-20 mx-auto mb-6">
              <img 
                src={logoPath} 
                alt="Lion's Café & Bakery Logo" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Lion's Café & Bakery
            </h1>
            <p className="text-xl md:text-2xl text-brand-orange font-medium mb-6">
              Pride of Peace of Mind
            </p>
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Where artisan craftsmanship meets coffee culture. Experience the finest baked goods and specialty beverages in an atmosphere of refined elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <Button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 text-lg transform hover:scale-105 transition-all">
                  <Utensils className="w-5 h-5 mr-2" />
                  Explore Our Menu
                </Button>
              </Link>
              <Link href="/story">
                <Button 
                  variant="outline"
                  className="glass-morphism border-white/20 hover:bg-white/20 text-white px-8 py-4 text-lg transition-all"
                >
                  <Store className="w-5 h-5 mr-2" />
                  Visit Our Store
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white text-2xl opacity-70" />
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/menu">
              <GlassCard hover className="p-6 text-center">
                <Smartphone className="w-8 h-8 text-brand-orange mb-4 mx-auto" />
                <h3 className="font-semibold mb-2 text-white">Order Online</h3>
                <p className="text-sm text-gray-300">Quick pickup & delivery</p>
              </GlassCard>
            </Link>
            
            <Link href="/reservations">
              <GlassCard hover className="p-6 text-center">
                <Calendar className="w-8 h-8 text-brand-orange mb-4 mx-auto" />
                <h3 className="font-semibold mb-2 text-white">Reserve Table</h3>
                <p className="text-sm text-gray-300">Book your dining experience</p>
              </GlassCard>
            </Link>
            
            <GlassCard hover className="p-6 text-center cursor-pointer">
              <Bell className="w-8 h-8 text-brand-orange mb-4 mx-auto" />
              <h3 className="font-semibold mb-2 text-white">Notifications</h3>
              <p className="text-sm text-gray-300">Special offers & updates</p>
            </GlassCard>
            
            <Link href="/auth">
              <GlassCard hover className="p-6 text-center">
                <UserIcon className="w-8 h-8 text-brand-orange mb-4 mx-auto" />
                <h3 className="font-semibold mb-2 text-white">My Account</h3>
                <p className="text-sm text-gray-300">Orders & preferences</p>
              </GlassCard>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Menu */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Selections</h2>
            <p className="text-xl text-gray-300">Handcrafted daily with premium ingredients</p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <GlassCard key={i} className="p-6">
                  <div className="animate-pulse">
                    <div className="bg-gray-700 h-48 rounded-lg mb-4" />
                    <div className="bg-gray-700 h-4 rounded mb-2" />
                    <div className="bg-gray-700 h-3 rounded mb-4" />
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-700 h-6 w-16 rounded" />
                      <div className="bg-gray-700 h-8 w-20 rounded" />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredItems?.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link href="/menu">
              <Button 
                variant="outline"
                className="glass-morphism border-white/20 hover:bg-white/20 text-white px-8 py-3"
              >
                View Full Menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

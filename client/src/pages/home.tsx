import { useState, useEffect } from "react";
import { Utensils, Store, Calendar, Bell, User as UserIcon, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/menu/menu-item";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";
import { pushNotificationManager } from "@/lib/push-notifications";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();

  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ['/api/menu'],
    select: (data: MenuItem[]) => data.slice(0, 4), // Show first 4 items for mobile
  });

  useEffect(() => {
    // Initialize push notifications
    pushNotificationManager.initialize();
  }, []);

  const handleNotificationSetup = async () => {
    const permission = await pushNotificationManager.requestPermission();
    
    if (permission === 'granted') {
      await pushNotificationManager.subscribeToPushNotifications();
      toast({
        title: "Notifications Enabled! 🎉",
        description: "You'll now receive special offers and updates from Lion's Café.",
      });
      
      // Send a test notification after 2 seconds
      setTimeout(() => {
        pushNotificationManager.simulateOfferNotification();
      }, 2000);
    } else {
      toast({
        title: "Notifications Disabled",
        description: "You can enable them anytime in your browser settings.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pb-4">
      {/* Mobile Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080"
            alt="Artisanal breads and pastries display"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4">
            <img 
              src={logoPath} 
              alt="Lion's Café & Bakery Logo" 
              className="w-full h-full rounded-full object-cover shadow-lg"
            />
          </div>
          
          <h1 className="text-2xl font-bold mb-2 text-white">
            Lion's Café & Bakery
          </h1>
          <p className="text-lg text-brand-orange font-medium mb-4">
            Pride of Peace of Mind
          </p>
          <p className="text-sm text-gray-200 leading-relaxed max-w-sm mx-auto">
            Premium artisan craftsmanship meets coffee culture
          </p>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Link href="/menu">
            <div className="glass-morphism-dark p-4 rounded-2xl text-center touch-feedback">
              <Utensils className="w-8 h-8 text-brand-orange mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-1">Order Now</h3>
              <p className="text-xs text-gray-600">Browse menu</p>
            </div>
          </Link>
          
          <Link href="/reservations">
            <div className="glass-morphism-dark p-4 rounded-2xl text-center touch-feedback">
              <Calendar className="w-8 h-8 text-brand-orange mb-3 mx-auto" />
              <h3 className="font-semibold text-gray-900 mb-1">Reserve</h3>
              <p className="text-xs text-gray-600">Book table</p>
            </div>
          </Link>
        </div>

        {/* Additional Actions */}
        <div className="space-y-3">
          <div className="glass-morphism-dark p-4 rounded-2xl flex items-center justify-between touch-feedback" onClick={() => handleNotificationSetup()}>
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-brand-orange" />
              <div>
                <h3 className="font-medium text-gray-900">Enable Notifications</h3>
                <p className="text-xs text-gray-600">Get special offers & updates</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>

          {/* Demo Notification Button */}
          <div 
            className="glass-morphism-dark p-4 rounded-2xl flex items-center justify-between touch-feedback" 
            onClick={() => pushNotificationManager.simulateOrderNotification()}
          >
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-blue-500" />
              <div>
                <h3 className="font-medium text-gray-900">Demo Notification</h3>
                <p className="text-xs text-gray-600">Test push notifications</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </div>

          <Link href="/auth">
            <div className="glass-morphism-dark p-4 rounded-2xl flex items-center justify-between touch-feedback">
              <div className="flex items-center space-x-3">
                <UserIcon className="w-6 h-6 text-brand-orange" />
                <div>
                  <h3 className="font-medium text-gray-900">My Account</h3>
                  <p className="text-xs text-gray-600">Login or sign up</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </Link>

          <Link href="/story">
            <div className="glass-morphism-dark p-4 rounded-2xl flex items-center justify-between touch-feedback">
              <div className="flex items-center space-x-3">
                <Store className="w-6 h-6 text-brand-orange" />
                <div>
                  <h3 className="font-medium text-gray-900">Our Story</h3>
                  <p className="text-xs text-gray-600">About Lion's Café</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Items */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Popular Items</h2>
          <Link href="/menu">
            <button className="text-brand-orange text-sm font-medium flex items-center">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-morphism-dark p-4 rounded-2xl">
                <div className="animate-pulse flex space-x-4">
                  <div className="bg-gray-700 h-16 w-16 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="bg-gray-700 h-4 rounded w-3/4" />
                    <div className="bg-gray-700 h-3 rounded w-1/2" />
                    <div className="bg-gray-700 h-4 rounded w-1/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {featuredItems?.map((item) => (
              <div key={item.id} className="glass-morphism-dark p-4 rounded-2xl touch-feedback">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-700 rounded-xl flex-shrink-0 overflow-hidden">
                    {item.imageUrl && (
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{item.name}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                    <p className="text-lg font-bold text-brand-orange mt-1">
                      ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

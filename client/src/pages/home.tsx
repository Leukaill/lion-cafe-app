import { useState, useEffect } from "react";
import { Utensils, Store, Calendar, Bell, User as UserIcon, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/menu/menu-item";
import { MobileHeader } from "@/components/layout/mobile-header";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";
import { pushNotificationManager } from "@/lib/push-notifications";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const announcements = [
    {
      title: "Today's Special",
      description: "Fresh croissants and artisan coffee - 20% off until 2 PM!",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "Extended Hours",
      description: "Now open 7 AM - 9 PM daily. More time to enjoy your favorites!",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    },
    {
      title: "New Coffee Arrivals",
      description: "Ethiopian single-origin beans now available. Try our signature blend!",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
    }
  ];

  const { data: featuredItems, isLoading } = useQuery({
    queryKey: ['/api/menu'],
    select: (data: MenuItem[]) => data.slice(0, 4), // Show first 4 items for mobile
  });

  useEffect(() => {
    // Initialize push notifications
    pushNotificationManager.initialize();
    
    // Auto-advance carousel
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [announcements.length]);

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
    <div className="pb-24">
      <MobileHeader 
        title="Lion's Café" 
        showNotifications 
        showSearch 
        onSearchChange={setSearchQuery}
      />
      
      {/* Beautiful Announcements Section */}
      <section className="px-4 pt-6 pb-8">
        <div className="text-center mb-6">
          <div className="w-20 h-20 mx-auto mb-4">
            <img 
              src={logoPath} 
              alt="Lion's Café & Bakery Logo" 
              className="w-full h-full rounded-2xl object-cover shadow-lg"
            />
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-gray-900">
            Lion's Café & Bakery
          </h1>
          <p className="text-lg text-brand-orange font-medium mb-6">
            Pride of Peace of Mind
          </p>
        </div>

        {/* Announcements Carousel */}
        <div className="relative">
          <div 
            className="carousel-container overflow-hidden rounded-2xl touch-pan-x"
            onTouchStart={(e) => {
              const touch = e.touches[0];
              setTouchStart(touch.clientX);
            }}
            onTouchEnd={(e) => {
              if (!touchStart) return;
              const touchEnd = e.changedTouches[0].clientX;
              const diff = touchStart - touchEnd;
              
              if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                  // Swipe left - next slide
                  setCurrentSlide((prev) => (prev + 1) % announcements.length);
                } else {
                  // Swipe right - previous slide
                  setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
                }
              }
              setTouchStart(null);
            }}
          >
            <div 
              className="carousel-track flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {announcements.map((announcement, index) => (
                <div key={index} className="carousel-slide w-full flex-shrink-0">
                  <div className="glass-morphism-dark rounded-2xl overflow-hidden">
                    <div className="relative h-48">
                      <img 
                        src={announcement.image} 
                        alt={announcement.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-bold text-white text-xl mb-2">{announcement.title}</h3>
                        <p className="text-sm text-gray-200 leading-relaxed">{announcement.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Navigation Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 touch-feedback ${
                  index === currentSlide 
                    ? 'bg-brand-orange scale-110' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions Grid */}
      <section className="px-0 py-6">
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
      <section className="px-0 py-6">
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

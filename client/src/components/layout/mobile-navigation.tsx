import { Home, Menu, Calendar, User, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/hooks/use-cart";

export function MobileNavigation() {
  const [location] = useLocation();
  const { totalItems } = useCart();

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
      active: location === "/"
    },
    {
      icon: Menu,
      label: "Menu",
      href: "/menu",
      active: location === "/menu"
    },
    {
      icon: Calendar,
      label: "Reserve",
      href: "/reservations",
      active: location === "/reservations"
    },
    {
      icon: ShoppingBag,
      label: "Cart",
      href: "/cart",
      active: location === "/cart",
      badge: totalItems > 0 ? totalItems : undefined
    },
    {
      icon: User,
      label: "Profile",
      href: "/settings",
      active: location === "/settings"
    }
  ];

  return (
    <nav className="dynamic-island-nav">
      <div className="flex justify-center items-center px-6 py-2">
        {navItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <button className={`relative flex items-center justify-center dynamic-island-item transition-all duration-300 ease-out ${
                item.active 
                  ? 'text-white bg-brand-orange scale-110' 
                  : 'text-gray-600 hover:text-gray-800 hover:scale-105'
              }`}>
                <div className="relative">
                  <IconComponent className={`w-5 h-5 transition-all duration-300 ${
                    item.active ? 'scale-100' : 'scale-90'
                  }`} />
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px] shadow-lg">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                {/* Active indicator glow */}
                {item.active && (
                  <div className="absolute inset-0 bg-brand-orange rounded-full blur-sm opacity-30 scale-125 transition-all duration-300" />
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
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
    <nav className="bottom-nav">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <button className={`relative flex flex-col items-center justify-center p-3 min-w-[64px] touch-feedback transition-all duration-200 ${
                item.active 
                  ? 'text-brand-orange' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
                <div className="relative">
                  <IconComponent className={`w-6 h-6 transition-transform duration-200 ${
                    item.active ? 'scale-110' : 'scale-100'
                  }`} />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium transition-all duration-200 ${
                  item.active ? 'opacity-100 scale-100' : 'opacity-70 scale-95'
                }`}>{item.label}</span>
                {item.active && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-brand-orange rounded-full" />
                )}
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
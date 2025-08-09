import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "all", name: "All" },
  { id: "bakery", name: "Bakery" },
  { id: "coffee", name: "Coffee" },
  { id: "beverages", name: "Drinks" },
  { id: "meals", name: "Meals" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addItem } = useCart();
  const { toast } = useToast();

  const { data: allMenuItems, isLoading } = useQuery({
    queryKey: ['/api/menu'],
    queryFn: () => fetch('/api/menu').then(res => res.json()) as Promise<MenuItem[]>,
  });

  // Filter items based on category and search query
  const menuItems = allMenuItems?.filter(item => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1,
      imageUrl: item.imageUrl || undefined,
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  return (
    <div>
      <MobileHeader 
        title="Menu" 
        showMenu 
        showNotifications 
        showSearch 
        onSearchChange={setSearchQuery}
      />
      
      <div className="px-0 pb-24">

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide px-4 pt-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 px-6 py-2 rounded-full font-medium transition-all touch-feedback ${
                activeCategory === category.id
                  ? "bg-brand-orange text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        {isLoading ? (
          <div className="space-y-4 mt-6 px-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm">
                <div className="animate-pulse flex space-x-4">
                  <div className="bg-gray-200 h-20 w-20 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-3">
                    <div className="bg-gray-200 h-4 rounded w-3/4" />
                    <div className="bg-gray-200 h-3 rounded w-full" />
                    <div className="flex justify-between items-center">
                      <div className="bg-gray-200 h-4 rounded w-1/4" />
                      <div className="bg-gray-200 h-8 w-20 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : menuItems && menuItems.length > 0 ? (
          <div className="space-y-4 mt-6 px-4">
            {menuItems.map((item) => (
              <MobileMenuItemCard 
                key={item.id} 
                item={item} 
                onAddToCart={() => handleAddToCart(item)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileMenuItemCard({ 
  item, 
  onAddToCart 
}: { 
  item: MenuItem; 
  onAddToCart: () => void;
}) {
  return (
    <div className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm touch-feedback hover:shadow-md transition-shadow">
      <div className="flex space-x-4">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
          {item.imageUrl && (
            <img 
              src={item.imageUrl} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{item.name}</h3>
            <span className="text-brand-orange font-bold text-lg ml-2">
              ${parseFloat(item.price).toFixed(2)}
            </span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
          
          {item.allergens && item.allergens.length > 0 && (
            <p className="text-xs text-gray-500 mb-3">
              Contains: {item.allergens.join(', ')}
            </p>
          )}
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 capitalize">{item.category}</span>
            <Button 
              className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 text-sm font-medium flex items-center gap-2"
              onClick={onAddToCart}
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
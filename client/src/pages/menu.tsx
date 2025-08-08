import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MenuItem } from "@shared/schema";
import { MenuItemCard } from "@/components/menu/menu-item";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

const categories = [
  { id: "all", name: "All Items" },
  { id: "bakery", name: "Bakery" },
  { id: "coffee", name: "Coffee" },
  { id: "beverages", name: "Beverages" },
  { id: "meals", name: "Meals" },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: menuItems, isLoading } = useQuery({
    queryKey: ['/api/menu', activeCategory === "all" ? undefined : activeCategory],
    queryFn: ({ queryKey }) => {
      const [, category] = queryKey;
      const url = category ? `/api/menu?category=${category}` : '/api/menu';
      return fetch(url).then(res => res.json()) as Promise<MenuItem[]>;
    },
  });

  return (
    <div className="pt-20 pb-16 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Our Menu</h1>
          <p className="text-xl text-gray-300">Discover our artisanal creations</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={
                activeCategory === category.id
                  ? "bg-brand-orange hover:bg-orange-600 text-white"
                  : "glass-morphism border-white/20 hover:bg-white/20 text-white"
              }
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Menu Items */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
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
        ) : menuItems && menuItems.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <GlassCard className="inline-block p-8">
              <p className="text-gray-300 text-lg">
                No items found in this category.
              </p>
            </GlassCard>
          </div>
        )}
      </div>
    </div>
  );
}

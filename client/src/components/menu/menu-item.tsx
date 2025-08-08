import { Plus } from "lucide-react";
import { MenuItem } from "@shared/schema";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface MenuItemProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      quantity: 1,
      imageUrl: item.imageUrl,
    });
  };

  return (
    <GlassCard hover className="overflow-hidden">
      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-white">{item.name}</h3>
        <p className="text-gray-300 mb-4">{item.description}</p>
        
        {item.allergens && item.allergens.length > 0 && (
          <p className="text-sm text-gray-400 mb-4">
            Contains: {item.allergens.join(", ")}
          </p>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-brand-orange">
            ${item.price}
          </span>
          <Button
            onClick={handleAddToCart}
            className="bg-brand-orange hover:bg-orange-600 text-white"
            disabled={!item.available}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}

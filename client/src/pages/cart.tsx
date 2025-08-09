import { useState } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, total, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div>
        <MobileHeader title="Cart" showBack />
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            Add some delicious items from our menu to get started!
          </p>
          
          <Link href="/menu">
            <Button className="bg-brand-orange hover:bg-orange-600 px-8 py-3">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <MobileHeader title="Cart" showBack />
      
      <div className="px-4 pb-8">
        {/* Cart Header */}
        <div className="py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Order</h1>
          <p className="text-gray-600">{totalItems} {totalItems === 1 ? 'item' : 'items'} in cart</p>
        </div>

        {/* Cart Items */}
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div key={item.id} className="glass-morphism-dark p-4 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-orange to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">
                    {item.name.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-brand-orange">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors touch-feedback"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <span className="w-8 text-center font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors touch-feedback"
                      >
                        <Plus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 rounded-lg flex items-center justify-center transition-colors touch-feedback ml-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="glass-morphism-dark p-6 rounded-2xl mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Order Summary</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>${(total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link href="/checkout">
            <Button className="w-full bg-brand-orange hover:bg-orange-600 py-4 text-lg font-semibold">
              Proceed to Checkout
            </Button>
          </Link>
          
          <Link href="/menu">
            <Button variant="outline" className="w-full py-4 text-lg font-semibold">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
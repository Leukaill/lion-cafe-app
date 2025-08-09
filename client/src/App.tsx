import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { CartProvider } from "@/hooks/use-cart";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { InstallPrompt } from "@/components/pwa/install-prompt";
import { useState } from "react";
import { ShoppingCart } from "@/components/cart/shopping-cart";
import { AuthModal } from "@/components/auth/auth-modal";
import Home from "@/pages/home";
import Menu from "@/pages/menu";
import Reservations from "@/pages/reservations";
import Checkout from "@/pages/checkout";
import Story from "@/pages/story";
import NotFound from "@/pages/not-found";

function Router() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <div className="mobile-app bg-white text-gray-900">
      <div className="mobile-content px-4 pt-4 pb-6">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/menu" component={Menu} />
          <Route path="/reservations" component={Reservations} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/story" component={Story} />
          <Route path="/auth" component={() => {
            setIsAuthModalOpen(true);
            return <Home />;
          }} />
          <Route path="/cart" component={() => {
            setIsCartOpen(true);
            return <Home />;
          }} />
          <Route component={NotFound} />
        </Switch>
      </div>
      
      <MobileNavigation />
      
      {/* Global Components */}
      <ShoppingCart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <InstallPrompt />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

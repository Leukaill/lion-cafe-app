import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { Button } from "@/components/ui/button";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50">
      <GlassCard variant="dark" className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 flex-shrink-0">
              <img 
                src={logoPath} 
                alt="Lion's Café & Bakery Logo" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold text-white">Install Lion's Café App</h4>
              <p className="text-sm text-gray-400">Get the full experience on your device</p>
            </div>
          </div>
          <div className="flex space-x-2 flex-shrink-0 ml-4">
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
            >
              Later
            </Button>
            <Button
              onClick={handleInstall}
              size="sm"
              className="bg-brand-orange hover:bg-orange-600 text-white"
            >
              Install
            </Button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

import { ArrowLeft, MoreVertical } from "lucide-react";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ 
  title, 
  showBack = false, 
  showMenu = false, 
  onMenuClick 
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={() => window.history.back()}
              className="p-2 -ml-2 text-white hover:bg-white/10 rounded-lg touch-feedback"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          
          {!showBack && (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img 
                src={logoPath} 
                alt="Lion's Café" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <div>
            <h1 className="text-lg font-semibold text-white">
              {title || "Lion's Café"}
            </h1>
          </div>
        </div>

        {showMenu && (
          <button 
            onClick={onMenuClick}
            className="p-2 text-white hover:bg-white/10 rounded-lg touch-feedback"
          >
            <MoreVertical className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  );
}
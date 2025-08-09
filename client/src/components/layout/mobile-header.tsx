import { ArrowLeft, MoreVertical } from "lucide-react";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { NotificationCenter } from "@/components/notifications/notification-center";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  onMenuClick?: () => void;
}

export function MobileHeader({ 
  title, 
  showBack = false, 
  showMenu = false,
  showNotifications = true,
  onMenuClick 
}: MobileHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={() => window.history.back()}
              className="p-2 -ml-2 text-gray-900 hover:bg-gray-100 rounded-lg touch-feedback"
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
            <h1 className="text-lg font-semibold text-gray-900">
              {title || "Lion's Café"}
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {showNotifications && <NotificationCenter />}
          
          {showMenu && (
            <button 
              onClick={onMenuClick}
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg touch-feedback"
            >
              <MoreVertical className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
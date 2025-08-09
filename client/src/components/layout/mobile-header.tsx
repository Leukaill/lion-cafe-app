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
    <div className="sticky top-0 z-40 pt-4 px-4 bg-white">
      {/* Dynamic Island Style Header */}
      <div className="bg-gray-900 rounded-[28px] px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showBack && (
              <button 
                onClick={() => window.history.back()}
                className="p-1.5 -ml-1 text-white hover:bg-white/10 rounded-full touch-feedback"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            
            {!showBack && (
              <div className="w-7 h-7 rounded-full overflow-hidden">
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

          <div className="flex items-center space-x-1">
            {showNotifications && <NotificationCenter />}
            
            {showMenu && (
              <button 
                onClick={onMenuClick}
                className="p-2 text-white hover:bg-white/10 rounded-full touch-feedback"
              >
                <MoreVertical className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
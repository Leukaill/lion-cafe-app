import { ArrowLeft, MoreVertical, Search } from "lucide-react";
import logoPath from "@assets/509248693_18059664560223974_3939236321042090081_n_1754404764662_1754647863336.jpg";
import { NotificationCenter } from "@/components/notifications/notification-center";
import { useState } from "react";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
  showNotifications?: boolean;
  showSearch?: boolean;
  onMenuClick?: () => void;
  onSearchChange?: (query: string) => void;
}

export function MobileHeader({ 
  title, 
  showBack = false, 
  showMenu = false,
  showNotifications = true,
  showSearch = false,
  onMenuClick,
  onSearchChange
}: MobileHeaderProps) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery("");
      onSearchChange?.("");
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearchChange?.(value);
  };

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
          {showSearch && (
            <button 
              onClick={handleSearchToggle}
              className="p-2 text-gray-900 hover:bg-gray-100 rounded-lg touch-feedback"
            >
              <Search className="w-6 h-6" />
            </button>
          )}
          
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
      
      {/* Expandable Search Bar */}
      <div className={`search-dropdown transition-all duration-300 ease-in-out ${
        isSearchExpanded && showSearch 
          ? 'search-expanded' 
          : 'search-collapsed'
      }`}>
        <div className="px-4 pb-3 border-t border-gray-100 bg-white/95 backdrop-blur-lg">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all duration-200"
            autoFocus={isSearchExpanded}
          />
        </div>
      </div>
    </header>
  );
}
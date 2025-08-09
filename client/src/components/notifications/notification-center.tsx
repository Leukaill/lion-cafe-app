import { useState, useEffect } from "react";
import { Bell, X, Coffee, Calendar, ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'offer' | 'order' | 'reservation' | 'general';
  timestamp: Date;
  read: boolean;
}

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Special Offer!',
      message: '20% off all pastries today only. Limited time offer!',
      type: 'offer',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
    },
    {
      id: '2',
      title: 'New Menu Item',
      message: 'Try our new signature Lion\'s Latte - now available!',
      type: 'general',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: true,
    },
    {
      id: '3',
      title: 'Order Ready',
      message: 'Your order #1234 is ready for pickup!',
      type: 'order',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
    },
  ]);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'offer': return Gift;
      case 'order': return ShoppingBag;
      case 'reservation': return Calendar;
      default: return Coffee;
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll now receive updates about offers and orders!",
        });
        
        // Subscribe to push notifications
        if ('serviceWorker' in navigator) {
          const registration = await navigator.serviceWorker.ready;
          // In a real app, you'd subscribe to push notifications here
          console.log('Push notification subscription would be set up here');
        }
      }
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <>
      {/* Notification Bell Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-900 hover:bg-gray-100 rounded-lg touch-feedback"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Notifications</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {Notification.permission !== 'granted' && (
                <Button
                  onClick={requestNotificationPermission}
                  className="w-full mt-3 bg-brand-orange hover:bg-orange-600 text-white text-sm py-2"
                >
                  Enable Push Notifications
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className="p-4 space-y-3 overflow-y-auto h-full pb-20">
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => {
                  const IconComponent = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`glass-morphism-dark p-4 rounded-xl ${
                        !notification.read ? 'border-l-4 border-brand-orange' : ''
                      }`}
                      onClick={() => !notification.read && markAsRead(notification.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          notification.type === 'offer' ? 'bg-green-600/20 text-green-400' :
                          notification.type === 'order' ? 'bg-blue-600/20 text-blue-400' :
                          notification.type === 'reservation' ? 'bg-purple-600/20 text-purple-400' :
                          'bg-brand-orange/20 text-brand-orange'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className={`font-medium text-sm ${
                              !notification.read ? 'text-white' : 'text-gray-300'
                            }`}>
                              {notification.title}
                            </h3>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-gray-500 hover:text-gray-300 p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                          
                          <p className={`text-xs leading-relaxed ${
                            !notification.read ? 'text-gray-300' : 'text-gray-400'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <p className="text-xs text-gray-500 mt-2">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
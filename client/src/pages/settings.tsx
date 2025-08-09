import { useState } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { Button } from "@/components/ui/button";
// import { useAuth } from "@/lib/auth";
import { pushNotificationManager } from "@/lib/push-notifications";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { 
  Bell, 
  User, 
  Coffee, 
  ChevronRight, 
  LogOut, 
  Settings as SettingsIcon,
  TestTube,
  ToggleLeft,
  ToggleRight
} from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Temporarily disable auth until we fix the Firebase issue
  const user = null;

  const handleEnableNotifications = async () => {
    try {
      await pushNotificationManager.requestPermission();
      setNotificationsEnabled(true);
      toast({
        title: "Notifications Enabled",
        description: "You'll receive special offers & updates",
      });
    } catch (error) {
      toast({
        title: "Permission Denied",
        description: "Please enable notifications in your browser settings",
        variant: "destructive",
      });
    }
  };

  const handleDemoNotification = async () => {
    try {
      await pushNotificationManager.sendTestNotification();
      toast({
        title: "Test Sent",
        description: "Check if you received the notification!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send test notification",
        variant: "destructive",
      });
    }
  };

  const handleSignOut = async () => {
    // TODO: Implement sign out functionality
    toast({
      title: "Sign Out",
      description: "This feature will be implemented soon",
    });
  };

  const settingsItems = [
    {
      icon: Bell,
      title: "Enable Notifications",
      description: "Get special offers & updates",
      type: "toggle" as const,
      enabled: notificationsEnabled,
      onToggle: handleEnableNotifications
    },
    {
      icon: TestTube,
      title: "Demo Notification",
      description: "Test push notifications",
      type: "button" as const,
      onPress: handleDemoNotification
    },
    {
      icon: User,
      title: "My Account",
      description: "Login or sign up",
      type: "button" as const,
      onPress: () => toast({ title: "Account", description: "Login feature coming soon!" })
    },
    {
      icon: Coffee,
      title: "Our Story",
      description: "About Lion's Café",
      type: "navigate" as const,
      href: "/story"
    }
  ];

  return (
    <div>
      <MobileHeader title="Settings" showBack />
      
      <div className="px-4 pb-8">
        {/* Profile Section */}
        <div className="py-6 text-center">
          <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mx-auto mb-4">
            <SettingsIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your café experience</p>
        </div>

        {/* Settings List */}
        <div className="space-y-3 mb-8">
          {settingsItems.map((item, index) => {
            const IconComponent = item.icon;
            
            if (item.type === "navigate") {
              return (
                <Link key={index} href={item.href!}>
                  <div className="glass-morphism-dark p-4 rounded-2xl touch-feedback">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-brand-orange" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                      
                      <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                    </div>
                  </div>
                </Link>
              );
            }
            
            return (
              <div key={index} className="glass-morphism-dark p-4 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-brand-orange/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-brand-orange" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>

                  {item.type === "toggle" && (
                    <button
                      onClick={() => item.onToggle?.()}
                      className="ml-4 p-1 touch-feedback"
                    >
                      {item.enabled ? (
                        <ToggleRight className="w-8 h-8 text-brand-orange" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  )}

                  {item.type === "button" && (
                    <Button
                      onClick={item.onPress}
                      variant="outline"
                      size="sm"
                      className="ml-4"
                    >
                      Test
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Account Actions */}
        {user && (
          <div className="space-y-3">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full py-4 text-lg font-semibold border-red-200 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </div>
        )}

        {/* App Info */}
        <div className="mt-8 glass-morphism-dark p-4 rounded-2xl">
          <h3 className="font-semibold text-gray-900 mb-2">App Information</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Version</span>
              <span>1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span>Build</span>
              <span>2024.1</span>
            </div>
            <div className="flex justify-between">
              <span>Last Updated</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
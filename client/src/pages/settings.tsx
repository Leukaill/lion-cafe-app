import { useState } from "react";
import { MobileHeader } from "@/components/layout/mobile-header";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { 
  Bell, 
  User, 
  Coffee, 
  ChevronRight, 
  LogOut, 
  Phone,
  MessageSquare,
  Shield,
  Volume2,
  Moon,
  Sun,
  Globe,
  CreditCard,
  HelpCircle,
  FileText,
  Star,
  Trash2,
  Download,
  Languages
} from "lucide-react";
import { pushNotificationManager } from "@/lib/push-notifications";

export default function Settings() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(Notification.permission === 'granted');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleNotificationToggle = async () => {
    if (!notificationsEnabled) {
      try {
        await pushNotificationManager.requestPermission();
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled",
          description: "You'll receive special offers and updates",
        });
      } catch (error) {
        toast({
          title: "Permission Denied",
          description: "Please enable notifications in your browser settings",
          variant: "destructive",
        });
      }
    } else {
      setNotificationsEnabled(false);
      toast({
        title: "Notifications Disabled",
        description: "You won't receive push notifications",
      });
    }
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          title: "Profile Information",
          description: "Manage your personal details",
          action: () => toast({ title: "Profile", description: "Coming soon" })
        },
        {
          icon: CreditCard,
          title: "Payment Methods",
          description: "Manage cards and payment options",
          action: () => toast({ title: "Payment", description: "Coming soon" })
        },
        {
          icon: Star,
          title: "Order History",
          description: "View your past orders",
          action: () => toast({ title: "Order History", description: "Coming soon" })
        }
      ]
    },
    {
      title: "Preferences",
      items: [
        {
          icon: Bell,
          title: "Push Notifications",
          description: "Special offers and order updates",
          type: "toggle" as const,
          enabled: notificationsEnabled,
          onToggle: handleNotificationToggle
        },
        {
          icon: Volume2,
          title: "Sound Effects",
          description: "App sounds and feedback",
          type: "toggle" as const,
          enabled: soundEnabled,
          onToggle: () => setSoundEnabled(!soundEnabled)
        },
        {
          icon: darkMode ? Sun : Moon,
          title: "Theme",
          description: darkMode ? "Switch to light mode" : "Switch to dark mode",
          type: "toggle" as const,
          enabled: darkMode,
          onToggle: () => {
            setDarkMode(!darkMode);
            toast({ title: "Theme", description: "Theme switching coming soon" });
          }
        },
        {
          icon: Languages,
          title: "Language",
          description: "English (US)",
          action: () => toast({ title: "Language", description: "Multiple languages coming soon" })
        }
      ]
    },
    {
      title: "Support & Contact",
      items: [
        {
          icon: Phone,
          title: "Contact Restaurant",
          description: "Call, message, or visit us",
          action: () => setLocation('/contact')
        },
        {
          icon: HelpCircle,
          title: "Help & FAQ",
          description: "Get answers to common questions",
          action: () => toast({ title: "Help", description: "FAQ section coming soon" })
        },
        {
          icon: MessageSquare,
          title: "Send Feedback",
          description: "Share your thoughts with us",
          action: () => toast({ title: "Feedback", description: "Feedback form coming soon" })
        },
        {
          icon: Star,
          title: "Rate Our App",
          description: "Leave a review on the app store",
          action: () => toast({ title: "Rate App", description: "Thank you for your interest!" })
        }
      ]
    },
    {
      title: "Legal & Privacy",
      items: [
        {
          icon: FileText,
          title: "Terms of Service",
          description: "Read our terms and conditions",
          action: () => toast({ title: "Terms", description: "Terms page coming soon" })
        },
        {
          icon: Shield,
          title: "Privacy Policy",
          description: "How we protect your data",
          action: () => toast({ title: "Privacy", description: "Privacy policy coming soon" })
        },
        {
          icon: Download,
          title: "Data Export",
          description: "Download your account data",
          action: () => toast({ title: "Data Export", description: "Export feature coming soon" })
        }
      ]
    },
    {
      title: "App Info",
      items: [
        {
          icon: Coffee,
          title: "About Lion's Café",
          description: "Learn about our story",
          action: () => setLocation('/story')
        },
        {
          icon: Globe,
          title: "App Version",
          description: "v1.0.0 - Latest",
          action: () => toast({ title: "Version", description: "You're running the latest version" })
        },
        {
          icon: Trash2,
          title: "Clear Cache",
          description: "Free up storage space",
          action: () => toast({ title: "Cache Cleared", description: "App cache has been cleared" })
        }
      ]
    }
  ];

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-brand-orange' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="pb-24">
      <MobileHeader title="Settings" showBack />
      
      <div className="px-4 pb-8">
        {/* Profile Section */}
        <div className="py-6 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-gray-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Customize your café experience</p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              <h2 className="text-lg font-semibold text-gray-900 mb-4 px-2">{group.title}</h2>
              <div className="space-y-3">
                {group.items.map((item, index) => {
                  const IconComponent = item.icon;
                  
                  return (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-4 rounded-2xl shadow-sm touch-feedback hover:shadow-md transition-shadow cursor-pointer"
                      onClick={item.action}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-gray-600" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                        
                        {'type' in item && item.type === 'toggle' ? (
                          <ToggleSwitch 
                            enabled={('enabled' in item && item.enabled) || false} 
                            onToggle={('onToggle' in item && item.onToggle) || (() => {})} 
                          />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sign Out Section */}
        <div className="mt-8">
          <div
            className="bg-red-50 border border-red-200 p-4 rounded-2xl shadow-sm touch-feedback hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => toast({ title: "Sign Out", description: "Sign out feature coming soon" })}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-6 h-6 text-red-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-red-900 mb-1">Sign Out</h3>
                  <p className="text-sm text-red-600">Sign out of your account</p>
                </div>
              </div>
              
              <ChevronRight className="w-5 h-5 text-red-400 ml-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}